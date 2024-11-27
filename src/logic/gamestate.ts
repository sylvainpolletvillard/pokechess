import type Phaser from "phaser";
import { FAST_TRAVELS } from "../data/destinations";
import { BOURG_PALETTE } from "../data/destinations/bourg_palette";
import { receiveItem } from "../data/dialogs/descriptions";
import { ITEM_POKEBALL } from "../data/items";
import type { Pokemon, PokemonEntry } from "../data/pokemons";
import {
	ASSISTANT_TUTO_DIALOG_STATE,
	CHAMPIONS,
	CHAMPIONS_LIGUE,
} from "../data/trainers";
import { t } from "../i18n";
import { hideAlliancesInfo } from "../objects/alliancesInfo";
import { drawFightStats, hideStatsBox } from "../objects/fightStatsBox";
import { showCenterText } from "../objects/gui";
import { type Menu, closeMenu } from "../objects/menu";
import { updateFightButton } from "../objects/menuButtons";
import { hidePokeballsCounter } from "../objects/pokeballsCounter";
import type { PokemonOnBoard } from "../objects/pokemon";
import { updatePokemonInfoBox } from "../objects/pokemonInfoBox";
import type GameScene from "../scenes/GameScene";
import type { MyScene } from "../scenes/MyScene";
import type { Badge } from "../types/badge";
import {
	type Destination,
	type RoomArena,
	type RoomTutorial,
	RoomType,
} from "../types/destination";
import type { Dialog, DialogLine } from "../types/dialog";
import { fadeOut } from "../utils/camera";
import { clearTimeouts, randomInt, wait } from "../utils/helpers";
import { removeAllAlterations, updateAlterations } from "./alteration";
import { startMusic } from "./audio";
import {
	type Board,
	calcXpBoard,
	clearPlacement,
	setupPlayerIdleBoard,
	spawnPokemon,
} from "./board";
import { enterDestination } from "./destination";
import { startDialog } from "./dialog";
import { enrageBoard, gainXP, initJumps, updatePokemonAction } from "./fight";
import { raisePokemonsPension } from "./pension";
import { Player } from "./player";
import { checkProjectilesImpact } from "./projectile";
import { loadSave, saveState } from "./save";
import { spawnPensionTeam } from "./spawns";
import { pickStarters } from "./starters";
import { logStats, resetStats } from "./stats";

export enum GameStage {
	CREATION = "CREATION",
	PLACEMENT = "PLACEMENT",
	CAPTURE = "CAPTURE",
	LAUNCH = "LAUNCH",
	FIGHT = "FIGHT",
	ENDED = "ENDED",
}

export class GameState {
	day: number;
	currentDestination: Destination;
	currentRoomIndex: number;
	roomOrder: string[];
	players: Player[];
	board: Board;
	stage: GameStage;
	fightTime: number;
	fightTimer?: Phaser.Time.TimerEvent;
	fightClock?: Phaser.Time.TimerEvent;
	activeScene: MyScene | null;
	activeMenu: Menu | null;
	activeDialog: Dialog | null;
	starters: PokemonEntry[];
	music: Phaser.Sound.WebAudioSound | undefined;
	dialogStates: { [pnjName: string]: number };
	seed: number;
	lastCaptureDestination: Destination | null;
	lastTourMam: number;
	pension: PokemonOnBoard[];
	pokedexSeen: Set<string>;
	pokedexCaptured: Set<string>;
	wokeUpRonflex: boolean;

	constructor() {
		this.activeScene = null;
		this.reset();

		// @ts-ignore
		window.gameState = this; //TEMP: DEBUG
	}

	reset() {
		this.day = 0;
		this.currentDestination = BOURG_PALETTE;
		this.currentRoomIndex = 0;
		const p1 = new Player(1);
		const p2 = new Player(2);
		this.players = [p1, p2];
		this.board = setupPlayerIdleBoard(p1);
		this.stage = GameStage.CREATION;
		this.activeMenu = null;
		this.activeDialog = null;
		this.starters = pickStarters();
		this.pension = [];
		this.dialogStates = {};
		this.seed = randomInt(1, 4 ** 10);
		this.lastCaptureDestination = null;
		this.lastTourMam = 0;
		this.pokedexCaptured = new Set();
		this.pokedexSeen = new Set();
		this.wokeUpRonflex = false;
	}

	get player() {
		return this.players[0];
	}

	get currentRoom() {
		const roomRef = this.roomOrder[this.currentRoomIndex];
		return this.currentDestination.rooms[roomRef];
	}

	get allPokemonsOnBoard(): PokemonOnBoard[] {
		return [...gameState.board.playerTeam, ...gameState.board.otherTeam];
	}

	hasBadge(badge: Badge) {
		return gameState.player.badges.includes(badge.ref);
	}

	receiveBadge(badge: Badge) {
		if (!gameState.player.badges.includes(badge.ref)) {
			gameState.player.badges.push(badge.ref);
		}
	}

	initGame(useSave: boolean) {
		// QUICK TESTING
		/*
        gameState.player.badges = [BADGE_AME.ref,BADGE_AME.ref]

        gameState.player.inventory[ITEM_POKEBALL.ref] = 20
        gameState.player.inventory[VITESSE_PLUS.ref] = 1
        gameState.player.inventory[GEMME_VOLT.ref] = 1
        
        gameState.player.team = [
            new PokemonOnBoard({ entry: DODRIO, owner: 1, level: 24, x:3, y:6 }),
            new PokemonOnBoard({ entry: TRIOPIKEUR, owner: 1, level: 24, x:2, y:7 }),
        ]
        enterDestination(TEST_ROOM([
            new PokemonOnBoard({ entry: NOADKOKO, owner: 2, level: 24, x:1, y:2 }),
            new PokemonOnBoard({ entry: NOADKOKO, owner: 2, level: 24, x:5, y:2 }),
        ]))
        
        this.initRoom()
        */

		if (!useSave || !loadSave()) {
			//new game
			gameState.reset();
			this.pension = spawnPensionTeam();
			enterDestination(BOURG_PALETTE);
		} else {
			this.activeScene!.scene.start("MapScene");
		}
	}

	goToNextRoom() {
		const rooms = this.roomOrder;
		this.currentRoomIndex++;
		if (this.currentRoomIndex >= rooms.length) {
			gameState.exitDestination();
		} else {
			gameState.initRoom();
		}
	}

	exitDestination() {
		if (gameState.currentDestination.onExit) {
			gameState.currentDestination.onExit();
		}
		if (FAST_TRAVELS.has(gameState.currentDestination)) {
			gameState.currentDestination = FAST_TRAVELS.get(
				gameState.currentDestination,
			)!;
			if (gameState.lastCaptureDestination != null)
				gameState.lastCaptureDestination = gameState.currentDestination;
		}
		this.nextDay();
		gameState.activeScene!.scene.start("MapScene");
	}

	nextDay() {
		gameState.day++;
		saveState();
		raisePokemonsPension();
	}

	initRoom() {
		clearTimeouts();
		if (gameState.currentRoom.type === RoomType.FREEWALK) {
			gameState.activeScene!.scene.start("RoomScene");
		} else {
			gameState.activeScene!.scene.start("GameScene");
		}
	}

	initFight(game: GameScene) {
		this.stage = GameStage.LAUNCH;
		closeMenu();
		clearPlacement(game);
		gameState.board.xpEarned = calcXpBoard();

		resetStats();
		initJumps();

		game.time.addEvent({
			delay: 900,
			callback: () => {
				game.hideCenterText();
				for (const pokemon of this.board.playerTeam) {
					spawnPokemon(pokemon, game);
				}

				if (gameState.currentRoom.type === RoomType.ARENA) {
					for (const pokemon of this.board.otherTeam) {
						spawnPokemon(pokemon, game);
					}
				}
			},
		});

		game.time.addEvent({
			delay: 2600,
			callback: () => {
				this.stage = GameStage.FIGHT;
				this.fightTimer = game.time.addEvent({
					delay: game.gameSpeed,
					callback: this.loopFight,
					callbackScope: this,
					loop: true,
				});
				this.fightTime = 0;
				this.fightClock = game.time.addEvent({
					delay: 1000,
					callback: this.onClockTick,
					callbackScope: this,
					loop: true,
				});
			},
		});
	}

	loopFight() {
		const game = gameState.activeScene as GameScene;
		if (this.stage === GameStage.FIGHT) {
			gameState.allPokemonsOnBoard.forEach((pokemon) => {
				updatePokemonAction(pokemon, game);
				updateAlterations(pokemon, game);
			});
			checkProjectilesImpact(game);
			updatePokemonInfoBox();
		}
	}

	async endFight(loser: number) {
		const game = gameState.activeScene as GameScene;
		const room = gameState.currentRoom;
		this.stage = GameStage.ENDED;
		removeAllAlterations();
		game.time.removeEvent(this.fightTimer!);
		game.time.removeEvent(this.fightClock!);

		const player = game.sprites.get("player");
		const hasWon = loser !== 1;
		if (hasWon) {
			player?.play("trainer_victory");
			showCenterText("text_victoire", game);
			if (room.type === RoomType.WILD) startMusic("music_victory_wild");
			else if (CHAMPIONS.includes((room as RoomArena).trainer))
				startMusic("music_victory_champion");
			else startMusic("music_victory_trainer");
		} else {
			player?.play("trainer_defeat");
			showCenterText("text_defaite", game);
		}

		hideAlliancesInfo();
		hidePokeballsCounter();
		wait(750).then(() => {
			logStats();
			drawFightStats();
		});

		let xpPerPokemon =
			(gameState.board.xpEarned || 0) / gameState.player.team.length;
		xpPerPokemon = Math.max(1, Math.ceil(xpPerPokemon));

		const lines: DialogLine[] = [];
		if (hasWon) {
			if (room.type === RoomType.ARENA && room.trainer)
				lines.push(t("victory", { trainer: t(`trainer.${room.trainer.ref}`) }));
			lines.push(
				t("victory_xp", {
					xp: Math.round(xpPerPokemon / 10),
				}),
			);
		} else if (room.type !== RoomType.TUTORIAL) {
			lines.push(t("defeat.0"), t("defeat.1"));
		}

		gameState.player.team.forEach((pokemon) => pokemon.resetAfterFight());

		await startDialog(lines);

		if (hasWon) {
			for (const pokemon of gameState.player.team) {
				await gainXP(pokemon, xpPerPokemon);
			}
		}

		hideStatsBox();

		if (
			[RoomType.ARENA, RoomType.TUTORIAL].includes(gameState.currentRoom.type)
		) {
			const arena = gameState.currentRoom as RoomArena;
			await startDialog(
				hasWon ? arena.trainer.dialogs.victory : arena.trainer.dialogs.defeat,
				{ speaker: arena.trainer.ref },
			);
			if (gameState.currentRoom.type === RoomType.ARENA) {
				let nbPokeballsReceived = 1;
				if (hasWon) {
					if (CHAMPIONS.includes(arena.trainer)) nbPokeballsReceived = 3;
					else if (CHAMPIONS_LIGUE.includes(arena.trainer))
						nbPokeballsReceived = 0;
					else nbPokeballsReceived = 2;
				}
				if (nbPokeballsReceived > 0)
					await receiveItem(
						ITEM_POKEBALL,
						nbPokeballsReceived,
						false,
						"trainer",
					);
			}
		}

		gameState.afterEnd(hasWon);
	}

	endCapture() {
		const game = gameState.activeScene as GameScene;
		this.stage = GameStage.ENDED;
		game.time.removeEvent(this.fightTimer!);
		game.time.removeEvent(this.fightClock!);

		const player = game.sprites.get("player");
		player?.play("trainer_victory");
		updateFightButton();

		return wait(100)
			.then(() => {
				if (gameState.currentRoom.type === RoomType.TUTORIAL) {
					const room = gameState.currentRoom as RoomTutorial;
					let dialog = room.trainer.dialogs.victory;
					if (
						gameState.dialogStates.assistant_tuto ===
						ASSISTANT_TUTO_DIALOG_STATE.AFTER_WILD
					) {
						dialog = room.trainer.dialogs.step3;
					}
					return startDialog(dialog, { speaker: room.trainer.ref });
				}
			})
			.then(() => {
				gameState.afterEnd(true);
			});
	}

	afterEnd(hasWon: boolean) {
		if (
			gameState.currentRoom.type === RoomType.TUTORIAL &&
			gameState.dialogStates.assistant_tuto ===
				ASSISTANT_TUTO_DIALOG_STATE.BEFORE_WILD
		) {
			const room = gameState.currentRoom as RoomTutorial;
			startDialog(room.trainer.dialogs.step2, { speaker: room.trainer.ref });
		} else {
			const beforeExit: () => Promise<void> =
				gameState.currentRoom.beforeExit || (() => Promise.resolve());
			beforeExit()
				.then(() => fadeOut(400))
				.then(() => {
					if (hasWon) gameState.goToNextRoom();
					else gameState.exitDestination();
				});
		}
	}

	onClockTick() {
		this.fightTime++;
		if (this.fightTime >= 30 && this.fightTime % 10 === 0) enrageBoard();
		gameState.allPokemonsOnBoard.forEach((pokemon) => {
			pokemon.buffs.clock.forEach((buff) => buff());
		});
	}

	registerPokemonsSeen(team: PokemonOnBoard[]) {
		team.map((p) => p.entry.ref).forEach((ref) => this.pokedexSeen.add(ref));
	}

	registerPokemonCaptured(pokemon: Pokemon) {
		this.pokedexCaptured.add(pokemon.entry.ref);
	}
}

export const gameState = new GameState();
