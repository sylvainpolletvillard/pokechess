import { ALL_BADGES } from "../data/badges";
import { EFFECTS } from "../data/effects";
import { POKEBALLS } from "../data/pokeballs";
import { POKEMONS, type PokemonEntry } from "../data/pokemons";
import { POKEMON_TYPES } from "../data/types";
import { declareAnims } from "../utils/anims";
import { Direction } from "../utils/directions";
export const DIRECTIONS = [
	Direction.UP,
	Direction.LEFT,
	Direction.DOWN,
	Direction.RIGHT,
];

export function getDirection(dx: number, dy: number) {
	return dx > 0
		? Direction.RIGHT
		: dx < 0
			? Direction.LEFT
			: dy < 0
				? Direction.UP
				: Direction.DOWN;
}

export function setupAnims(
	anims: Phaser.Animations.AnimationManager,
	debug?: boolean,
) {
	generatePokemonsAnims(anims);
	generatePokeballAnims(anims, debug);
	setupEffects(anims, debug);
	setupTrainerAnims(anims, debug);
	setupMapAnims(anims, debug);
	setupInteractionsAnims(anims, debug);
	setupGUI(anims, debug);
}

export function setupEffects(
	anims: Phaser.Animations.AnimationManager,
	debug?: boolean,
) {
	Object.values(EFFECTS).forEach((effect) => {
		anims.create({
			key: effect.key,
			frames: anims.generateFrameNumbers("effects", { frames: effect.frames }),
			frameRate: effect.frameRate,
			repeat: debug ? -1 : (effect.repeat ?? 0),
		});
	});
}

export function generatePokemonsAnims(
	anims: Phaser.Animations.AnimationManager,
) {
	POKEMONS.forEach((pokemon: PokemonEntry, dp: number) => {
		anims.create({
			key: `${pokemon.ref}_portrait`,
			frames: anims.generateFrameNumbers("pokemon_portraits", {
				start: dp,
				end: dp,
			}),
		});

		DIRECTIONS.forEach((dir, dd) => {
			const frame_top_left = (dp % 15) * 2 + Math.floor(dp / 15) * 120;
			anims.create({
				key: `${pokemon.ref}_${dir}`,
				frames: anims.generateFrameNumbers("pokemon", {
					frames: [
						frame_top_left + (dd % 2) + (dd > 1 ? 60 : 0),
						frame_top_left + 30 + (dd % 2) + (dd > 1 ? 60 : 0),
					],
				}),
				frameRate: 5,
				repeat: -1,
			});
		});
	});
}

export function generatePokeballAnims(
	anims: Phaser.Animations.AnimationManager,
	debug?: boolean,
) {
	POKEBALLS.forEach((ball, i) => {
		anims.create({
			key: `${ball}_idle`,
			frames: anims.generateFrameNumbers("pokeball", {
				frames: [i + 3 * 5],
			}),
		});
		anims.create({
			key: `${ball}_launch`,
			frames: anims.generateFrameNumbers("pokeball", {
				frames: Array.from({ length: 3 }).map((_, j) => j * 5 + i),
			}),
			frameRate: 12,
			repeat: -1,
		});
		anims.create({
			key: `${ball}_in`,
			frames: anims.generateFrameNumbers("pokeball", {
				frames: [
					...Array.from({ length: 12 }).map((_, j) => (j + 3) * 5 + i),
					i + 3 * 5,
				],
			}),
			frameRate: 16,
			repeat: debug ? -1 : 0,
		});
		anims.create({
			key: `${ball}_jiggle`,
			frames: anims.generateFrameNumbers("pokeball", {
				frames: Array.from({ length: 5 }).map((_, j) => (j + 15) * 5 + i),
			}),
			frameRate: 16,
			repeat: -1,
			yoyo: true,
		});
		anims.create({
			key: `${ball}_jiggle_once`,
			frames: anims.generateFrameNumbers("pokeball", {
				frames: [i + 17 * 5, i + 16 * 5, i + 15 * 5, i + 16 * 5, i + 3 * 5],
			}),
			frameRate: 16,
			repeat: 0,
		});
		anims.create({
			key: `${ball}_out`,
			frames: anims.generateFrameNumbers("pokeball", {
				frames: Array.from({ length: 6 }).map((_, j) => (j + 20) * 5 + i),
			}),
			frameRate: 16,
			repeat: debug ? -1 : 0,
		});
		anims.create({
			key: `${ball}_catch`,
			frames: anims.generateFrameNumbers("pokeball", {
				frames: [
					...Array.from({ length: 5 }).map((_, j) => (j + 26) * 5 + i),
					i + 3 * 5,
				],
			}),
			frameRate: 16,
			repeat: debug ? -1 : 0,
		});
	});
}

export function setupTrainerAnims(
	anims: Phaser.Animations.AnimationManager,
	debug?: boolean,
) {
	anims.create({
		key: "trainer_launch",
		frames: anims.generateFrameNumbers("trainer", {
			frames: [0, 1, 2, 3, 4, 0],
		}),
		frameRate: 8,
		repeat: debug ? -1 : 0,
	});
	anims.create({
		key: "trainer_idle",
		frames: anims.generateFrameNumbers("trainer", { frames: [0] }),
	});
	anims.create({
		key: "trainer_victory",
		frames: anims.generateFrameNumbers("trainer", { frames: [5] }),
	});
	anims.create({
		key: "trainer_defeat",
		frames: anims.generateFrameNumbers("trainer", { frames: [6] }),
	});
}

export function setupGUI(
	anims: Phaser.Animations.AnimationManager,
	debug?: boolean,
) {
	anims.create({
		key: "cursor_wave",
		frames: anims.generateFrameNumbers("gui", { frames: [0, 1] }),
		frameRate: 8,
		repeat: debug ? -1 : 0,
	});
	anims.create({
		key: "cursor_drag",
		frames: anims.generateFrameNumbers("gui", { frames: [2, 3, 4, 5] }),
		frameRate: 16,
		repeat: debug ? -1 : 0,
	});
	anims.create({
		key: "cursor_drop",
		frames: anims.generateFrameNumbers("gui", { frames: [5, 4, 3, 2, 6] }),
		frameRate: 16,
		repeat: debug ? -1 : 0,
	});
	anims.create({
		key: "cursor_click",
		frames: anims.generateFrameNumbers("gui", { frames: [7, 8, 9, 6] }),
		frameRate: 16,
		repeat: debug ? -1 : 0,
	});
	anims.create({
		key: "cursor_point",
		frames: anims.generateFrameNumbers("gui", { frames: [6] }),
		frameRate: 8,
		repeat: debug ? -1 : 0,
	});
	anims.create({
		key: "stat_attack",
		frames: anims.generateFrameNumbers("gui", { frames: [10] }),
	});
	anims.create({
		key: "stat_speed",
		frames: anims.generateFrameNumbers("gui", { frames: [11] }),
	});
	anims.create({
		key: "stat_defense",
		frames: anims.generateFrameNumbers("gui", { frames: [12] }),
	});
	anims.create({
		key: "stat_range",
		frames: anims.generateFrameNumbers("gui", { frames: [13] }),
	});

	Object.values(POKEMON_TYPES).forEach((type) => {
		anims.create({
			key: `type_${type.ref}`,
			frames: anims.generateFrameNumbers("icons16x16", {
				frames: [type.frameIndex],
			}),
		});
	});

	Object.values(ALL_BADGES).forEach((badge) => {
		anims.create({
			key: badge.ref,
			frames: anims.generateFrameNumbers("icons16x16", {
				frames: [badge.frameIndex],
			}),
		});
	});

	anims.create({
		key: `icon_pokeball`,
		frames: anims.generateFrameNumbers("icons16x16", { frames: [20] }),
	});

	anims.create({
		key: "text_victoire",
		frames: anims.generateFrameNumbers("texts", { frames: [0] }),
	});
	anims.create({
		key: "text_defaite",
		frames: anims.generateFrameNumbers("texts", { frames: [1] }),
	});
	anims.create({
		key: "text_fight",
		frames: anims.generateFrameNumbers("texts", { frames: [2] }),
	});
	anims.create({
		key: "text_capture",
		frames: anims.generateFrameNumbers("texts", { frames: [3] }),
	});
}

export function setupMapAnims(
	anims: Phaser.Animations.AnimationManager,
	debug?: boolean,
) {
	declareAnims(anims, "map", [
		["player_idle", [4]],
		["player_right", [0, 1], 8, -1],
		["player_left", [2, 3], 8, -1],
		["player_down", [5, 6], 8, -1],
		["player_up_idle", [7]],
		["player_up", [8, 9], 8, -1],
		["cascade", [10, 11, 12, 13], 8, -1],
		["boat", [14, 15], 1, -1],
		["ronflex", [16]],
		["highlight", [17, 18, 19], 4, -1],
		["map_direction_arrow", [20]],
		["gift", [21]],
		["safari", [22]],
		["cave_entrance", [23]],
		["icon_ligue", [24]],
	]);
}

export function setupInteractionsAnims(
	anims: Phaser.Animations.AnimationManager,
	debug?: boolean,
) {
	declareAnims(anims, "interactions", [
		["interaction_talk", [0, 1, 2, 3], 3, -1],
		["interaction_loot", [4, 5, 6, 7, 6, 5], 6, -1],
	]);
}
