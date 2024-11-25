import {
	type Pokemon,
	type PokemonEntry,
	getNonLegendaryPokemons,
} from "../data/pokemons";
import { gameState } from "../logic/gamestate";
import { TILE_SIZE } from "../logic/level";
import type RoomScene from "../scenes/RoomScene";
import { declareAnims } from "../utils/anims";
import { Direction } from "../utils/directions";
import { pickRandomIn } from "../utils/helpers";

export const CHARACTER_STATE = {
	LEFT: Direction.LEFT,
	RIGHT: Direction.RIGHT,
	UP: Direction.UP,
	DOWN: Direction.DOWN,
	WALKING_LEFT: `WALKING_${Direction.LEFT}`,
	WALKING_RIGHT: `WALKING_${Direction.RIGHT}`,
	WALKING_UP: `WALKING_${Direction.UP}`,
	WALKING_DOWN: `WALKING_${Direction.DOWN}`,
} as const;

const ANIM_BY_STATE: { [state in keyof typeof CHARACTER_STATE]: string } = {
	[CHARACTER_STATE.DOWN]: "_idle_down",
	[CHARACTER_STATE.UP]: "_idle_up",
	[CHARACTER_STATE.LEFT]: "_idle_side",
	[CHARACTER_STATE.RIGHT]: "_idle_side",
	[CHARACTER_STATE.WALKING_DOWN]: "_walk_down",
	[CHARACTER_STATE.WALKING_UP]: "_walk_up",
	[CHARACTER_STATE.WALKING_LEFT]: "_walk_side",
	[CHARACTER_STATE.WALKING_RIGHT]: "_walk_side",
};

const MOVE_SPEED = 128;
const WALK_ANIM_SPEED = 8;

export class Character {
	sprite: Phaser.Physics.Arcade.Sprite;
	state: keyof typeof CHARACTER_STATE;
	walkingDirection: Direction | null;
	isForceMoving: boolean;
	forceMoveTimeout?: number;
	name: string;

	constructor(
		position: { x: number; y: number },
		name: string,
		startState = CHARACTER_STATE.DOWN,
		interactionDistance = 1,
	) {
		this.name = name;
		const scene = gameState.activeScene as RoomScene;
		this.sprite = scene.physics.add.sprite(
			position.x * TILE_SIZE + TILE_SIZE / 2,
			position.y * TILE_SIZE,
			"characters",
		);
		this.sprite.setScale(2);
		this.state = startState;
		this.sprite.setOrigin(0.5, 0.5);
		scene.physics.world.enable(this.sprite);
		this.sprite.setBodySize(16, 16).setOffset(4, 12);
		this.sprite.setData("character", this);
		this.sprite.setData("interactionDistance", interactionDistance);
		this.walkingDirection = null;
		this.isForceMoving = false;

		this.addAnimations();
		Character.prototype.update.call(this);
	}

	get isMoving() {
		return this.walkingDirection !== null;
	}

	get spriteRowIndex() {
		if (this.name.startsWith("assistant")) return 3;
		switch (this.name) {
			case "player":
				return 0;
			case "mam":
				return 1;
			case "chen":
			case "chen_end":
				return 2;
			case "seller_male":
				return 4;
			case "seller_female":
				return 5;
			case "trader":
				return 6 + ((gameState.currentDestination.shopId ?? 0) % 10);
			case "healer":
				return 26;
			case "info":
			default:
				return 16 + ((gameState.currentDestination.shopId ?? 0) % 10);
		}
	}

	get direction() {
		switch (this.state) {
			case CHARACTER_STATE.LEFT:
			case CHARACTER_STATE.WALKING_LEFT:
				return Direction.LEFT;
			case CHARACTER_STATE.RIGHT:
			case CHARACTER_STATE.WALKING_RIGHT:
				return Direction.RIGHT;
			case CHARACTER_STATE.UP:
			case CHARACTER_STATE.WALKING_UP:
				return Direction.UP;
			case CHARACTER_STATE.DOWN:
			case CHARACTER_STATE.WALKING_DOWN:
			default:
				return Direction.DOWN;
		}
	}

	update() {
		this.sprite.play(this.name + ANIM_BY_STATE[this.state], true);
		this.sprite.flipX =
			this.state === CHARACTER_STATE.WALKING_RIGHT ||
			this.state === CHARACTER_STATE.RIGHT;
	}

	addAnimations() {
		const di = this.spriteRowIndex * 9;
		declareAnims(this.sprite.anims, "characters", [
			[`${this.name}_idle_down`, [di]],
			[`${this.name}_idle_up`, [di + 1]],
			[`${this.name}_idle_side`, [di + 2]],
			[`${this.name}_walk_down`, [di + 3, di, di + 4, di], WALK_ANIM_SPEED],
			[
				`${this.name}_walk_up`,
				[di + 5, di + 1, di + 6, di + 1],
				WALK_ANIM_SPEED,
			],
			[
				`${this.name}_walk_side`,
				[di + 7, di + 2, di + 8, di + 2],
				WALK_ANIM_SPEED,
			],
		]);
	}

	stopMoving() {
		this.walkingDirection = null;
		this.sprite.body?.stop();
		this.alignOnGrid();

		// idle
		switch (this.state) {
			case CHARACTER_STATE.WALKING_LEFT:
				this.state = CHARACTER_STATE.LEFT;
				break;
			case CHARACTER_STATE.WALKING_RIGHT:
				this.state = CHARACTER_STATE.RIGHT;
				break;
			case CHARACTER_STATE.WALKING_UP:
				this.state = CHARACTER_STATE.UP;
				break;
			case CHARACTER_STATE.WALKING_DOWN:
				this.state = CHARACTER_STATE.DOWN;
				break;
		}
	}

	move(direction: Direction) {
		this.walkingDirection = direction;
		this.alignOnGrid();

		switch (direction) {
			case Direction.DOWN:
				this.state = CHARACTER_STATE.WALKING_DOWN;
				this.sprite.setVelocity(0, MOVE_SPEED);
				break;
			case Direction.UP:
				this.state = CHARACTER_STATE.WALKING_UP;
				this.sprite.setVelocity(0, -MOVE_SPEED);
				break;
			case Direction.LEFT:
				this.state = CHARACTER_STATE.WALKING_LEFT;
				this.sprite.setVelocity(-MOVE_SPEED, 0);
				break;
			case Direction.RIGHT:
				this.state = CHARACTER_STATE.WALKING_RIGHT;
				this.sprite.setVelocity(MOVE_SPEED, 0);
				break;
		}
	}

	moveBack(nbSteps: number) {
		let backwards = Direction.UP;
		switch (this.direction) {
			case Direction.LEFT:
				backwards = Direction.RIGHT;
				break;
			case Direction.RIGHT:
				backwards = Direction.LEFT;
				break;
			case Direction.UP:
				backwards = Direction.DOWN;
				break;
			case Direction.DOWN:
			default:
				backwards = Direction.UP;
				break;
		}
		return this.forceMove(backwards, nbSteps * 300);
	}

	forceMove(direction: Direction, duration = 500): Promise<void> {
		this.isForceMoving = true;
		this.move(direction);

		return new Promise((resolve) => {
			clearTimeout(this.forceMoveTimeout);
			this.forceMoveTimeout = setTimeout(() => {
				this.isForceMoving = false;
				resolve();
			}, duration);
		});
	}

	alignOnGrid() {
		// used to deal with floating point precision when using arcade velocity
		if (this.sprite.body == null) return;
		this.sprite.body.x = Math.round(this.sprite.body.x);
		this.sprite.body.y = Math.round(this.sprite.body.y);
	}
}

export class Trader extends Character {
	pokemonToGive: Pokemon | null;
	pokemonToReceive: PokemonEntry;
	hasExchanged: boolean;

	constructor(
		position: { x: number; y: number },
		name: string,
		startState = CHARACTER_STATE.DOWN,
		interactionDistance = 1,
	) {
		super(position, name, startState, interactionDistance);
		this.hasExchanged = false;
		this.pokemonToGive = pickRandomIn(
			gameState.player.box.filter((p) => p != null),
		);
		this.pokemonToReceive = pickRandomIn(getNonLegendaryPokemons());
	}
}
