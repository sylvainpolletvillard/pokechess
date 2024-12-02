import { loadSprites } from "../data/sprites";
import { loadSpritesheets } from "../data/spritesheets";
import { loadTilemaps } from "../data/tilemaps";
import { CHAMPIONS, CHAMPIONS_LIGUE } from "../data/trainers";
import { setupAnims } from "../logic/anims";
import { startMusic } from "../logic/audio";
import {
	drawGUI,
	drawPokemonsOnBoard,
	getNumberMaxAllowedOnBoard,
	setupRoomBoard,
	setupSafariBoard,
} from "../logic/board";
import { startDialog } from "../logic/dialog";
import { GameStage, type GameState, gameState } from "../logic/gamestate";
import { handleCursor, setupInputs } from "../logic/inputs";
import { handleClick } from "../objects/cursor";
import { showCenterText, updateGUI } from "../objects/gui";
import { clickEntry } from "../objects/menu";
import { hideMenuButtons } from "../objects/menuButtons";
import { drawPokeballsCounter } from "../objects/pokeballsCounter";
import { drawRoomNamePanel } from "../objects/roomNamePanel";
import { drawTrainers, showTrainerIntro } from "../objects/trainers";
import { type RoomArena, type RoomBoard, RoomType } from "../types/destination";
import { randomInt, wait } from "../utils/helpers";
import { MyScene } from "./MyScene";

export default class GameScene extends MyScene {
	gameSpeed = 100;
	state: GameState;
	currentTileMap?: any;

	constructor() {
		super("GameScene");
		// @ts-ignore
		window.game = this; //TODO: remove global
		this.state = gameState;
	}

	preload() {
		loadSprites(this);
		loadSpritesheets(this);
		loadTilemaps(this);
	}

	create() {
		gameState.activeScene = this;
		const room = gameState.currentRoom as RoomBoard;
		setupInputs(this);
		setupAnims(this.anims);
		this.drawMap();
		this.drawIntro().then(() => {
			if (room.type === RoomType.SAFARI || room.type === RoomType.PENSION) {
				gameState.stage = GameStage.CAPTURE;
			} else {
				gameState.stage = GameStage.PLACEMENT;
			}
			drawGUI(this);
			drawPokemonsOnBoard(this);
		});

		if (room.type === RoomType.SAFARI) {
			gameState.board = setupSafariBoard(room);
		} else {
			gameState.board = setupRoomBoard(gameState.player, room);
		}

		startMusic(room.music);
		gameState.registerPokemonsSeen(gameState.board.otherTeam);
	}

	update() {
		handleCursor(this);
		updateGUI(this);
	}

	drawMap() {
		const room = gameState.currentRoom as RoomBoard;
		if (room.maps) {
			room.mapIndex = room.mapIndex
				? (room.mapIndex % 3) + 1
				: randomInt(1, room.maps.length);
			room.map = room.maps[room.mapIndex - 1];
		}
		const map = this.make.tilemap({ key: room.map });
		if (this.currentTileMap != null) {
			this.currentTileMap.destroy();
		}
		this.currentTileMap = map;
		const tileset = map.addTilesetImage("ground", "ground");
		if (!tileset) {
			console.error("Tileset not found");
			return;
		}
		map.createLayer("ground0", tileset);
		map.createLayer("ground1", tileset);
		map.createLayer("top0", tileset);
	}

	drawIntro(): Promise<any> {
		drawRoomNamePanel();
		drawTrainers(this);

		if (
			gameState.currentRoom.type === RoomType.WILD ||
			gameState.currentRoom.type === RoomType.SAFARI
		) {
			return wait(1000).then(() => {
				drawPokeballsCounter();
				return showCenterText("text_capture", this);
			});
		}

		if (
			[RoomType.ARENA, RoomType.TUTORIAL, RoomType.PENSION].includes(
				gameState.currentRoom.type,
			)
		) {
			const room = gameState.currentRoom as RoomArena;
			showTrainerIntro(room.trainer);
			return wait(2000).then(() =>
				startDialog(room.trainer.dialogs.start, { speaker: room.trainer.ref }),
			);
		}

		return Promise.resolve();
	}

	hideCenterText() {
		this.sprites.get("centerText")?.destroy(true);
		this.sprites.delete("centerText");
	}

	get canLaunchFight() {
		return (
			gameState.stage === GameStage.PLACEMENT &&
			gameState.board.playerTeam.length <= getNumberMaxAllowedOnBoard()
		);
	}

	launchFight() {
		if (this.canLaunchFight) {
			hideMenuButtons();
			gameState.initFight(this);
			const player = this.sprites.get("player");
			wait(500).then(() => player?.play("trainer_launch"));
			showCenterText("text_fight", this);
			if (gameState.currentRoom.type === RoomType.WILD)
				startMusic("music_battle_wild");
			else {
				const trainer = (gameState.currentRoom as RoomArena).trainer;
				if (CHAMPIONS.includes(trainer) || CHAMPIONS_LIGUE.includes(trainer))
					startMusic("music_battle_champion");
				else startMusic("music_battle_trainer");
			}
		}
	}

	onPressStart() {
		this.launchFight();
	}

	onPressA() {
		const stopPropagation = gameState.activeMenu && clickEntry();
		if (!stopPropagation) handleClick(this);
	}

	onPressB() {
		if (gameState.activeMenu != null) gameState.activeMenu.handleCancel!();
	}

	onClick() {
		handleClick(this);
	}

	destroy() {
		this.currentTileMap.destroy();
		delete this.currentTileMap;
	}
}
