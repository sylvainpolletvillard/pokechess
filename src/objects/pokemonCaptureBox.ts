import { Z } from "../data/depths";
import { POKEBALL_LABEL_COLORS } from "../data/pokeballs";
import type { Pokemon } from "../data/pokemons";
import { t } from "../i18n";
import { gameState } from "../logic/gamestate";
import type GameScene from "../scenes/GameScene";
import { addText } from "../utils/text";
import type { PokemonOnBoard } from "./pokemon";

let currentPokemonCaptureInfoDisplayed: Pokemon | null;
let pokemonCaptureBox: Phaser.GameObjects.Container | null;
let pokeballOnHand: Phaser.GameObjects.Sprite | null;

const WIDTH = 100;
const HEIGHT = 32;

export function displayPokemonCaptureInfo(
	pokemon: PokemonOnBoard,
	game: GameScene,
) {
	if (currentPokemonCaptureInfoDisplayed === pokemon) return;
	if (currentPokemonCaptureInfoDisplayed != null) hidePokemonCaptureInfo(game);
	currentPokemonCaptureInfoDisplayed = pokemon;

	const cursor = game.sprites.get("cursor")!;

	pokemonCaptureBox = game.add.container(
		cursor.x - WIDTH - 8,
		cursor.y - HEIGHT - 8,
	);

	const pokemonInfoBoxBackground = game.add
		.nineslice(
			0,
			0, // this is the starting x/y location
			"box2", // a key to an already loaded image
			undefined,
			WIDTH,
			HEIGHT, // the width and height of your object
			4,
			4,
			4,
			4, // the width and height to offset for a corner slice
		)
		.setOrigin(0, 0);
	pokemonCaptureBox.add(pokemonInfoBoxBackground);

	if (gameState.player.inventory.pokeball < pokemon.cost) {
		const text1 = addText(6, 2, t("capture.not_enough_balls.0"));
		const text2 = addText(6, 16, t("capture.not_enough_balls.1"));
		pokemonCaptureBox.add(text1).add(text2);
	} else if (gameState.player.hasBoxFull) {
		const text1 = addText(6, 2, t("capture.box_full.0"));
		const text2 = addText(6, 16, t("capture.box_full.1"));
		pokemonCaptureBox.add(text1).add(text2);
	} else {
		const text1 = addText(6, 2, t("capture.capture_with"));
		const text2 = addText(6, 16, pokemon.pokeball, {
			color: POKEBALL_LABEL_COLORS[pokemon.pokeball],
		});
		pokemonCaptureBox.add(text1).add(text2);

		pokeballOnHand = game.add.sprite(
			Math.floor(cursor.x + 8),
			Math.floor(cursor.y + 12),
			"pokeball",
		);
		pokeballOnHand
			.play(`${pokemon.pokeball}_idle`)
			.setDepth(Z.JUST_BELOW_CURSOR);

		game.sprites.get("cursor")?.play("cursor_wave");
	}

	const pokeballCostSprite = game.add.sprite(74, 22, "pokeball", 25);
	pokeballCostSprite.play("POKEBALL_idle");
	const pokemonCostText = addText(84, 16, `x${pokemon.cost}`);
	pokemonCaptureBox.add(pokeballCostSprite).add(pokemonCostText);

	pokemonCaptureBox.setDepth(Z.MENU);
}

export function updatePokemonCaptureInfoPosition(game: GameScene) {
	if (!currentPokemonCaptureInfoDisplayed) return;
	const cursor = game.sprites.get("cursor")!;
	pokemonCaptureBox?.setPosition(
		Math.max(2, Math.floor(cursor.x - WIDTH - 8)),
		Math.max(0, Math.floor(cursor.y - HEIGHT - 8)),
	);
	pokeballOnHand?.setPosition(
		Math.floor(cursor.x + 8),
		Math.floor(cursor.y + 12),
	);
}

export function hidePokemonCaptureInfo(game: GameScene) {
	if (!pokemonCaptureBox) return;
	pokemonCaptureBox.destroy(true);
	pokemonCaptureBox = null;

	pokeballOnHand?.destroy(true);
	pokeballOnHand = null;

	currentPokemonCaptureInfoDisplayed = null;

	game.sprites.get("cursor")?.play("cursor_point");
}

export function getCurrentPokemonCaptureInfoDisplayed() {
	return currentPokemonCaptureInfoDisplayed;
}
