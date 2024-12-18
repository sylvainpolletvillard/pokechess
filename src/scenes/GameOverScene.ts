import { Z } from "../data/depths";
import type { Pokemon } from "../data/pokemons";
import { loadSprites } from "../data/sprites";
import { loadSpritesheets } from "../data/spritesheets";
import { t } from "../i18n";
import { preloadMusic, startMusic } from "../logic/audio";
import { gameState } from "../logic/gamestate";
import { setupInputs } from "../logic/inputs";
import { fadeOut } from "../utils/camera";
import { wait } from "../utils/helpers";
import { addText } from "../utils/text";
import { MyScene } from "./MyScene";

export default class GameOverScene extends MyScene {
	constructor() {
		super("GameOverScene");
	}

	preload() {
		loadSprites(this);
		loadSpritesheets(this);
		preloadMusic("music_ending", "assets/audio/music/30 Ending.mp3");
	}

	create() {
		gameState.activeScene = this;
		setupInputs(this);
		this.displayEndScreen();
		startMusic("music_ending");
	}

	canInteract = false;

	onPressStart() {
		this.handleClick();
	}

	onPressA() {
		this.handleClick();
	}

	onClick() {
		this.handleClick();
	}

	handleClick() {
		if (this.canInteract)
			fadeOut(2000).then(() => this.scene.start("MenuScene"));
	}

	async displayEndScreen() {
		gameState.player.team.forEach((pokemon, i) => {
			wait(3000 * i).then(() => this.displayEndScreenPokemonInfo(pokemon));
		});

		await wait(18000);
		this.displayPlayerResume();
		await wait(10000);
		this.canInteract = true;
	}

	displayEndScreenPokemonInfo(pokemon: Pokemon) {
		const pokemonInfoBox = this.add.group();

		const oy = game.scale.height + 80;
		const ox = game.scale.width / 2;

		const pokemonInfoBoxBackground = this.add
			.nineslice(
				ox,
				oy, // this is the starting x/y location
				"box1", // a key to an already loaded image
				undefined,
				280,
				84, // the width and height of your object
				8,
				8,
				8,
				8, // the width and height to offset for a corner slice
			)
			.setOrigin(0.5, 0.5)
			.setScrollFactor(0);
		pokemonInfoBox.add(pokemonInfoBoxBackground);

		const pokemonNameText = addText(
			ox - 50,
			oy - 28,
			`${t(`pokemon.${pokemon.entry.ref}`)} Lv${pokemon.level}`,
		);
		pokemonInfoBox.add(pokemonNameText);

		const portrait = this.add.sprite(ox - 92, oy - 1, "pokemon_portraits");
		portrait.play(`${pokemon.entry.ref}_portrait`);
		portrait.setScrollFactor(0);
		pokemonInfoBox.add(portrait);

		for (let i = 0; i < pokemon.types.length; i++) {
			const typeSprite = this.add.sprite(
				ox + 112 - i * 20,
				oy - 22,
				"icons16x16",
				pokemon.types[i].frameIndex,
			);
			typeSprite.setScrollFactor(0);
			pokemonInfoBox.add(typeSprite);
		}

		this.tweens.add({
			targets: pokemonInfoBox.getChildren(),
			y: -80,
			duration: 16000,
			ease: "Linear",
			onComplete() {
				pokemonInfoBox.destroy();
			},
		});

		pokemonInfoBox.setDepth(Z.MENU);
	}

	displayPlayerResume() {
		const box = this.add.group();

		const oy = game.scale.height + 80;
		const ox = game.scale.width / 2;

		const boxBackground = this.add
			.nineslice(
				ox,
				oy, // this is the starting x/y location
				"box1", // a key to an already loaded image
				undefined,
				280,
				84, // the width and height of your object
				8,
				8,
				8,
				8, // the width and height to offset for a corner slice
			)
			.setOrigin(0.5, 0.5)
			.setScrollFactor(0);
		box.add(boxBackground);

		box.add(
			addText(ox - 120, oy - 20, t("gameover.duree", { duree: gameState.day })),
		);
		box.add(addText(ox - 120, oy + 8, t("pokedex")));
		box.add(
			addText(
				ox - 50,
				oy + 8,
				t("gameover.seen", { number: gameState.pokedexSeen.size }),
			),
		);
		box.add(
			addText(
				ox + 20,
				oy + 8,
				t("gameover.caught", { number: gameState.pokedexCaptured.size }),
			),
		);

		const portrait = this.add.sprite(ox + 100, oy - 1, "trainer").setFrame(7);
		portrait.setScrollFactor(0);
		box.add(portrait);

		this.tweens.add({
			targets: box.getChildren(),
			y: "-= 240",
			duration: 8000,
			ease: "Linear",
		});
	}
}
