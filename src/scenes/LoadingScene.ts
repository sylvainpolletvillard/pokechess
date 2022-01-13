import { loadAudio, addSounds } from "../data/sounds"
import {addText} from "../utils/text";
import {gameState} from "../logic/gamestate";
import {MyScene} from "./MyScene";
import {loadFonts} from "../data/fonts";
import {MONT_SELENITE} from "../data/destinations/mont_selenite";
import {COL_DE_MONTAGNE} from "../data/destinations/col_montagne";
import {loadTilemaps} from "../data/tilemaps";
import {loadSprites} from "../data/sprites";
import {loadSpritesheets} from "../data/spritesheets";
import {PokemonOnBoard} from "../objects/pokemon";
import {Pokemon} from "../data/pokemons";
import {FORET_JADE} from "../data/destinations/foret_jade";
import {GEMME_VOLT, ITEM_POKEBALL, ORBE_GLACE, VITESSE_PLUS} from "../data/items";
import { ABO } from "../data/pokemons/abo";
import { ARCANIN } from "../data/pokemons/arcanin";
import { SAQUEDENEU } from "../data/pokemons/saquedeneu";

function quickStart(scene: Phaser.Scenes.ScenePlugin){
	gameState.currentDestination = FORET_JADE
	gameState.player.team = [ 
		//new PokemonOnBoard( new Pokemon(BULBIZARRE, 1, 20), 4 ,5),
		new PokemonOnBoard( new Pokemon(ABO, 1, 20), 5 ,5),
		new PokemonOnBoard( new Pokemon(SAQUEDENEU, 1, 20), 3 ,5),
	]
	gameState.player.inventory[ITEM_POKEBALL.ref] = 20
	gameState.player.inventory[VITESSE_PLUS.ref] = 1
	gameState.player.inventory[GEMME_VOLT.ref] = 1
	gameState.player.inventory[ORBE_GLACE.ref] = 1
}

export default class LoadingScene extends MyScene {
	preload() {
		gameState.activeScene = this

		const loadingText = addText(
			game.scale.width/2,
			game.scale.height - 8,
			"CHARGEMENT...",
			{ align: "center" }
		)
		loadingText.setOrigin(0.5).setDepth(3)

		const progressBar = this.add.graphics().fillStyle(0x6A793C);
		const progressBox = this.add.graphics().fillStyle(0x969989);
		progressBox
			.fillRect(0, game.scale.height - 16, game.scale.width, 16);

		this.load.on('progress', function (value: any) {
			loadingText.setText(Math.round(value*100)+"%")
			progressBar.fillRect(0, game.scale.height - 16, game.scale.width * value, 16);
			progressBar.setDepth(2)
		});

		this.load.on('complete', () => {
			progressBar.destroy();
			progressBox.destroy();

			// TEMP: QUICK START TEST
			quickStart(this.scene)
			gameState.initRoom()
		});

		// load title screen
		//this.add.image("title-bg", "assets/sprites/title-screen.png");

		loadFonts(this)
		loadAudio(this);
		loadSprites(this)
		loadSpritesheets(this);
		loadTilemaps(this);

	}

	create() {
		addSounds()
	}

}