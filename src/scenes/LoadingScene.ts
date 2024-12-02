import { loadAudio } from "../data/sounds";
import { loadSprites } from "../data/sprites";
import { loadSpritesheets } from "../data/spritesheets";
import { loadTilemaps } from "../data/tilemaps";
import { t } from "../i18n";
import { gameState } from "../logic/gamestate";
import { addText } from "../utils/text";
import { MyScene } from "./MyScene";

export default class LoadingScene extends MyScene {
	preload() {
		gameState.activeScene = this;

		const loadingText = addText(
			game.scale.width / 2,
			game.scale.height - 8,
			t("loading"),
			{ align: "center" },
		);
		loadingText.setOrigin(0.5).setDepth(3);

		const progressBar = this.add.graphics().fillStyle(0x6a793c);
		const progressBox = this.add.graphics().fillStyle(0x969989);
		progressBox.fillRect(0, game.scale.height - 16, game.scale.width, 16);

		this.load.on("progress", (value: any) => {
			loadingText.setText(`${Math.round(value * 100)}%`);
			progressBar.fillRect(
				0,
				game.scale.height - 16,
				game.scale.width * value,
				16,
			);
			progressBar.setDepth(2);
		});

		this.load.on("complete", () => {
			progressBar.destroy();
			progressBox.destroy();
			this.scene.start("MenuScene");
		});

		// load title screen
		//this.add.image("title-bg", "assets/sprites/title-screen.png");

		loadAudio(this);
		loadSprites(this);
		loadSpritesheets(this);
		loadTilemaps(this);
	}
}
