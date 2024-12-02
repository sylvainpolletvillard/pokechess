import { Z } from "../data/depths";
import { DESCRIPTIONS } from "../data/dialogs/descriptions";
import { showNextLine, startDialog, talkTo } from "../logic/dialog";
import { gameState } from "../logic/gamestate";
import { getMovementVector } from "../logic/inputs";
import { MAP_SCALING, TILE_SIZE } from "../logic/level";
import type RoomScene from "../scenes/RoomScene";
import { Direction, getDirectionFromVector } from "../utils/directions";
import { isBetween } from "../utils/helpers";
import { findObjectByName } from "../utils/map";
import { CHARACTER_STATE, Character } from "./character";

let ACTION_DELAY: number | null = null;

export class PlayerCharacter extends Character {
	movesBeforeTp: number;
	interactionSprite: Phaser.GameObjects.Sprite;

	constructor() {
		super({ x: 0, y: 0 }, "player");
		this.movesBeforeTp = 0;

		this.sprite.setCollideWorldBounds(true);

		this.interactionSprite = gameState.activeScene!.make.sprite({
			x: 0,
			y: 0,
			key: "interactions",
		});
		this.interactionSprite.setVisible(false).setDepth(Z.DIALOG);
		gameState.activeScene!.time.addEvent({
			delay: 300,
			callback: () => this.checkInFrontOfPlayer(),
			loop: true,
		});

		// @ts-ignore
		window.player = this; //TEMP
	}

	update() {
		super.update();
		this.updateControls();

		this.interactionSprite.setPosition(
			this.sprite.getCenter().x + 8,
			this.sprite.getCenter().y - 8,
		);
	}

	getWatchingPoint(distance = 1): { x: number; y: number } {
		// coordonnées du point ciblé
		let { x, y } = this.sprite.getCenter();
		y += TILE_SIZE / 2;
		switch (this.state) {
			case CHARACTER_STATE.LEFT:
			case CHARACTER_STATE.WALKING_LEFT:
				x -= TILE_SIZE * distance;
				break;
			case CHARACTER_STATE.RIGHT:
			case CHARACTER_STATE.WALKING_RIGHT:
				x += TILE_SIZE * distance;
				break;
			case CHARACTER_STATE.UP:
			case CHARACTER_STATE.WALKING_UP:
				y -= TILE_SIZE * distance;
				break;
			case CHARACTER_STATE.DOWN:
			case CHARACTER_STATE.WALKING_DOWN:
			default:
				y += TILE_SIZE * distance;
				break;
		}
		return { x, y };
	}

	get canInteract() {
		return !gameState.activeDialog && !gameState.activeMenu;
	}

	get canMove() {
		return (
			!gameState.activeDialog && !gameState.activeMenu && !this.isForceMoving
		);
	}

	checkInFrontOfPlayer() {
		const scene = gameState.activeScene as RoomScene;
		if (!scene.groups) return;
		const pnjInFront = this.getObjectWatched(scene.groups.characters);
		const objectInFront = this.getObjectWatched(scene.groups.objects);

		this.interactionSprite.setVisible(
			this.canInteract && !!(pnjInFront || objectInFront),
		);

		if (pnjInFront) this.interactionSprite.anims.play("interaction_talk", true);
		else if (objectInFront)
			this.interactionSprite.anims.play("interaction_loot", true);
	}

	updateControls() {
		const isAlignedOnGrid =
			isBetween(
				(this.sprite.body!.x + TILE_SIZE / 2) % TILE_SIZE,
				TILE_SIZE / 2 - 1,
				TILE_SIZE / 2 + 1,
			) &&
			isBetween(
				(this.sprite.body!.y + TILE_SIZE / 2) % TILE_SIZE,
				TILE_SIZE / 2 - 1,
				TILE_SIZE / 2 + 1,
			);

		const { moveVector } = getMovementVector(this.sprite.scene);
		const direction = getDirectionFromVector(moveVector);

		if (
			direction === null &&
			this.isMoving &&
			!this.isForceMoving &&
			isAlignedOnGrid
		) {
			// not touching controls, stop asap
			this.stopMoving();
		} else if (
			direction != null &&
			direction !== this.walkingDirection &&
			this.canMove &&
			isAlignedOnGrid
		) {
			this.move(direction);
		}

		if (this.isMoving && this.movesBeforeTp > 0) this.movesBeforeTp--;
	}

	getObjectWatched(group: Phaser.GameObjects.Group) {
		const d = 4; // delta margin
		return group.getChildren().find((obj: Phaser.GameObjects.GameObject) => {
			if (obj instanceof Phaser.GameObjects.Sprite) {
				let { x: cx, y: cy } = obj.getBottomCenter();
				const distance = obj.getData("interactionDistance") ?? 1;
				const { x, y } = this.getWatchingPoint(distance);
				cy -= 8;
				return isBetween(x, cx - d, cx + d) && isBetween(y, cy - d, cy + d);
			}
			return false;
		});
	}

	doAction() {
		if (ACTION_DELAY) return;
		ACTION_DELAY = setTimeout(() => {
			ACTION_DELAY = null;
		}, 250);
		if (gameState.activeDialog) return showNextLine();

		const scene = gameState.activeScene as RoomScene;

		const pnjInFront = this.getObjectWatched(scene.groups.characters);
		if (pnjInFront && this.canInteract) {
			return talkTo(pnjInFront.getData("character"), this.state);
		}

		const objectInFront = this.getObjectWatched(scene.groups.objects);
		if (objectInFront && this.canInteract) {
			let desc =
				DESCRIPTIONS[objectInFront.getData("name")] || DESCRIPTIONS.unknown;
			if (typeof desc === "function")
				desc = desc(objectInFront.getData("description"));
			startDialog(desc).then(() => {});
		}
	}

	goToDoor(doorName: string) {
		const scene = gameState.activeScene as RoomScene;
		const door = findObjectByName(doorName, "door", scene.level.tilemap);

		this.sprite.body?.reset(
			door.x * MAP_SCALING + TILE_SIZE / 2,
			door.y * MAP_SCALING,
		);
		this.alignOnGrid();
		const outDirection =
			Direction[door.properties.outDirection as Direction] ?? Direction.UP;
		scene.disableTriggers = true;
		this.forceMove(outDirection, 350).then(() => {
			scene.disableTriggers = false;
		});
	}
}
