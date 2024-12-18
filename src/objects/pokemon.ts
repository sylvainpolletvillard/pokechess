import type { AllianceState } from "../data/alliances";
import { type Alteration, AlterationType } from "../data/alterations";
import { Z } from "../data/depths";
import { OWNER_PLAYER } from "../data/owners";
import {
	Pokemon,
	type PokemonAction,
	type PokemonConstructor,
	type PokemonEntry,
	PokemonTypeAction,
	getPokemonCry,
} from "../data/pokemons";
import type { PokemonType } from "../data/types";
import { capturePokemon, getPositionFromCoords } from "../logic/board";
import { removeFromBox } from "../logic/box";
import { type Buffs, resetBuffs } from "../logic/buffs";
import { gameState } from "../logic/gamestate";
import { canAfford } from "../logic/shop";
import type GameScene from "../scenes/GameScene";
import { Direction } from "../utils/directions";
import { clamp, defer, wait } from "../utils/helpers";
import {
	addInteractiveElem,
	dragState,
	handleDragStart,
	testIfCanBeDragged,
} from "./cursor";
import { updatePokemonBars } from "./pokemonBar";
import { getCurrentPokemonCaptureInfoDisplayed } from "./pokemonCaptureBox";
import { hidePokemonInfo } from "./pokemonInfoBox";
import {
	displayPokemonReleaseBox,
	hidePokemonReleaseInfo,
} from "./pokemonReleaseBox";

interface PokemonOnBoardConstructor extends PokemonConstructor {
	x: number;
	y: number;
}

export class PokemonOnBoard extends Pokemon {
	x: number;
	y: number;
	placementX: number;
	placementY: number;
	facingDirection: Direction;
	nextAction: PokemonAction;
	alterations: Alteration[];
	initialEntry?: PokemonEntry;
	untargettable: boolean;
	unalterable: boolean;
	buffs: Buffs;

	constructor({
		entry,
		owner,
		xp,
		level,
		item,
		uid,
		x,
		y,
		shouldAutoEvolve,
	}: PokemonOnBoardConstructor) {
		super({ entry, owner, xp, level, item, uid, shouldAutoEvolve });
		this.x = x;
		this.y = y;
		this.placementX = x;
		this.placementY = y;
		this.reset();
	}

	reset(): PokemonOnBoard {
		this.x = this.placementX;
		this.y = this.placementY;
		this.facingDirection = this.owner === 1 ? Direction.UP : Direction.DOWN;
		this.resetAction({ type: PokemonTypeAction.IDLE });
		this.pv = this.maxPV;
		this.pp = 0;
		this.alterations = [];
		this.untargettable = false;
		this.unalterable = false;
		this.buffs = resetBuffs();
		return this;
	}

	get position() {
		return getPositionFromCoords(this.x, this.y);
	}

	get positionPlacement() {
		return getPositionFromCoords(this.placementX, this.placementY);
	}

	get attack(): number {
		let buffFactor = this.buffs.attack.reduce(
			(factor, buff) => factor + buff(),
			1,
		);

		const pouvoirAntique = this.alterations.find(
			(alt) => alt.type === AlterationType.POUVOIR_ANTIQUE,
		);
		if (pouvoirAntique) {
			buffFactor += 0.1 * clamp(pouvoirAntique.stacks, 0, 10);
		}

		const furie = this.alterations.find(
			(alt) => alt.type === AlterationType.FURIE,
		);
		if (furie) {
			buffFactor += 0.1 * clamp(furie.stacks, 0, 20);
		}

		const rage = this.alterations.find(
			(alt) => alt.type === AlterationType.RAGE,
		);
		if (rage) {
			buffFactor += 0.2 * rage.stacks;
		}

		return Math.max(1, super.attack * buffFactor);
	}

	get defense(): number {
		let buffFactor = this.buffs.defense.reduce(
			(factor, buff) => factor + buff(),
			1,
		);

		if (this.hasAlteration(AlterationType.ACIDE)) buffFactor -= 0.5;

		const pouvoirAntique = this.alterations.find(
			(alt) => alt.type === AlterationType.POUVOIR_ANTIQUE,
		);
		if (pouvoirAntique) {
			buffFactor += 0.1 * clamp(pouvoirAntique.stacks, 0, 10);
		}

		const armure = this.alterations.find(
			(alt) => alt.type === AlterationType.ARMURE,
		);
		if (armure) {
			buffFactor += 0.1 * clamp(armure.stacks, 0, 20);
		}

		const rage = this.alterations.find(
			(alt) => alt.type === AlterationType.RAGE,
		);
		if (rage) {
			buffFactor -= 0.2 * rage.stacks;
		}

		return Math.max(1, super.defense * buffFactor);
	}

	get speed(): number {
		let buffFactor = this.buffs.speed.reduce(
			(factor, buff) => factor + buff(),
			1,
		);

		const paralysie = this.alterations.find(
			(alt) => alt.type === AlterationType.PARALYSIE,
		);
		if (paralysie) {
			buffFactor -= clamp(0.01 * paralysie.stacks, 0, 0.5);
		}

		if (this.hasAlteration(AlterationType.SECRETION)) buffFactor -= 0.5;

		const pouvoirAntique = this.alterations.find(
			(alt) => alt.type === AlterationType.POUVOIR_ANTIQUE,
		);
		if (pouvoirAntique) {
			buffFactor += 0.1 * clamp(pouvoirAntique.stacks, 0, 10);
		}

		const hate = this.alterations.find(
			(alt) => alt.type === AlterationType.HATE,
		);
		if (hate) {
			buffFactor += 0.1 * hate.stacks;
		}

		const rage = this.alterations.find(
			(alt) => alt.type === AlterationType.RAGE,
		);
		if (rage) {
			buffFactor += 0.2 * rage.stacks;
		}

		return clamp(super.speed * buffFactor, 1, 500);
	}

	get precision(): number {
		if (this.hasAlteration(AlterationType.AVEUGLE)) return 0.5;
		return 1;
	}

	get dodge(): number {
		return clamp(
			this.buffs.dodge.reduce((factor, buff) => factor + buff(), 0),
			0,
			1,
		);
	}

	get alive(): boolean {
		return this.pv > 0;
	}

	get team(): PokemonOnBoard[] {
		return this.owner === OWNER_PLAYER
			? gameState.board.playerTeam
			: gameState.board.otherTeam;
	}

	get opponents(): PokemonOnBoard[] {
		return this.owner === OWNER_PLAYER
			? gameState.board.otherTeam
			: gameState.board.playerTeam;
	}

	get alliances(): Map<PokemonType, AllianceState> {
		return this.owner === OWNER_PLAYER
			? gameState.board.playerAlliances
			: gameState.board.otherTeamAlliances;
	}

	toBoxPokemon(game: GameScene): Pokemon {
		const pokemon = new Pokemon({
			uid: this.uid,
			entry: this.entry,
			owner: this.owner,
			xp: this.xp,
			item: this.item ?? undefined,
		});
		game.sprites.get(pokemon.uid)?.setData("pokemon", pokemon);
		return pokemon;
	}

	hasAlteration(type: AlterationType) {
		return this.alterations.some((alt) => alt.type === type);
	}

	makeUntargettable(durationInMs: number) {
		// clean up targets
		const board = gameState.board;
		const otherTeam =
			this.owner === OWNER_PLAYER ? board.otherTeam : board.playerTeam;
		otherTeam
			.filter((p) => p.nextAction.target === this)
			.forEach((p) => p.resetAction());
		this.untargettable = true;
		wait(durationInMs).then(() => {
			this.untargettable = false;
		});
	}

	resetAction(action: PokemonAction = { type: PokemonTypeAction.IDLE }) {
		this.nextAction?.timer?.remove();
		this.nextAction = action;
	}

	resetTarget(target: PokemonOnBoard) {
		this.resetAction({ type: PokemonTypeAction.IDLE, target });
	}

	resetAfterFight() {
		this.x = this.placementX;
		this.y = this.placementY;
		this.untargettable = false;
		this.unalterable = false;
		if (this.initialEntry) this.entry = this.initialEntry; // revert morphing/evolution
	}
}

export function makePokemonSprite(
	pokemon: Pokemon,
	game: GameScene,
): Phaser.GameObjects.Sprite {
	const [x, y] = pokemon instanceof PokemonOnBoard ? pokemon.position : [0, 0];
	const sprite = game.add.sprite(x, y, "pokemon");
	game.sprites.set(pokemon.uid, sprite);
	game.objects.set(`bars_${pokemon.uid}`, game.add.graphics()); // hp & pp bars
	sprite.setData("pokemon", pokemon);
	sprite.setData("type", "pokemon");
	sprite.play(`${pokemon.entry.ref}_DOWN`);
	sprite.setDepth(Z.POKEMON);
	sprite.anims.pause();
	sprite.setInteractive();
	game.input.setDraggable(sprite);
	addInteractiveElem(sprite);

	sprite.on("click", () => {
		if (dragState.draggedElem === null && testIfCanBeDragged(sprite)) {
			defer(() => handleDragStart(sprite, game));
		}
		if (
			getCurrentPokemonCaptureInfoDisplayed() === pokemon &&
			pokemon instanceof PokemonOnBoard &&
			canAfford(pokemon.cost) &&
			!gameState.player.hasBoxFull
		) {
			capturePokemon(pokemon, sprite, game);
		}
	});

	sprite.on("dragstart", () => {
		const pokemon = sprite.getData("pokemon");
		if (pokemon.owner !== 1) return;
		sprite.anims.resume();
		sprite.setAlpha(1);
		hidePokemonInfo();
		displayPokemonReleaseBox(pokemon);

		if (gameState.player.box.includes(pokemon)) {
			removeFromBox(pokemon);
		}
	});

	sprite.on("drop", (pointer: PointerEvent) => {
		sprite.anims.pause(sprite.anims.currentAnim?.getFrameByProgress(0));
		sprite.setAlpha(0.5);
		hidePokemonReleaseInfo();
	});

	return sprite;
}

export function movePokemonSprite(
	pokemon: PokemonOnBoard,
	x: number,
	y: number,
	game: GameScene,
) {
	pokemon.x = x;
	pokemon.y = y;
	const [sceneX, sceneY] = getPositionFromCoords(x, y);
	game.sprites.get(pokemon.uid)?.setPosition(sceneX, sceneY);
	updatePokemonBars(pokemon, game);
}

export function removePokemonSprite(pokemon: PokemonOnBoard, game: GameScene) {
	const sprite = game.sprites.get(pokemon.uid);
	sprite?.destroy();
	game.sprites.delete(pokemon.uid);

	const bars = game.objects.get(`bars_${pokemon.uid}`);
	if (bars != null) {
		bars.destroy();
		game.objects.delete(pokemon.uid);
	}
}
