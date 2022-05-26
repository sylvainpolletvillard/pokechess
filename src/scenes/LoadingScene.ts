import { loadAudio } from "../data/sounds"
import {addText} from "../utils/text";
import {gameState} from "../logic/gamestate";
import {MyScene} from "./MyScene";
import {loadFonts} from "../data/fonts";
import {loadTilemaps} from "../data/tilemaps";
import {loadSprites} from "../data/sprites";
import {loadSpritesheets} from "../data/spritesheets";

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
			gameState.initGame()
		});

		// load title screen
		//this.add.image("title-bg", "assets/sprites/title-screen.png");

		loadFonts(this)
		loadAudio(this);
		loadSprites(this)
		loadSpritesheets(this);
		loadTilemaps(this);

	}

}