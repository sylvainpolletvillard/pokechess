import Phaser from "phaser";
import {Destination, DestinationType, RoomArena, RoomTutorial, RoomType, RoomWild} from "../model/destination";
import {Player} from "./player";
import {Board, clearPlacement, setupPlayerIdleBoard, spawnPokemon} from "./board";
import {updatePokemonAction} from "./fight";
import Game from "../scenes/GameScene";
import {closeMenu, Menu} from "../objects/menu";
import {Dialog, startDialog} from "./dialog";
import {showCenterText} from "../objects/gui";
import { MyScene } from "../scenes/MyScene"
import {Pokemon} from "../data/pokemons";
import {pickStarters} from "./spawns";
import {BOURG_PALETTE, TEST_ROOM} from "../data/destinations/bourg_palette";
import {voicesByActor} from "../data/voices";
import {clearTimeouts, randomInt, wait} from "../utils/helpers";

export enum GameStage {
    CREATION,
    PLACEMENT,
    LAUNCH,
    FIGHT,
    ENDED
}

export class GameState {
    day: number;
    currentDestination: Destination;
    currentRoomIndex: number;
    players: Player[];
    board: Board;
    stage: GameStage;
    fightTimer?: Phaser.Time.TimerEvent;
    activeScene: MyScene | null;
    activeMenu: Menu | null;
    activeDialog: Dialog | null;
    starters: Pokemon[];
    music: Phaser.Sound.BaseSound | undefined;
    dialogStates: { [pnjName: string]: Number }
    seed: number;

    constructor() {
        this.day = 0
        this.currentDestination = BOURG_PALETTE;
        this.currentRoomIndex = 0;
        const p1 = new Player(1)
        const p2 = new Player(2)
        this.players = [p1 , p2]
        this.board = setupPlayerIdleBoard(this.player, TEST_ROOM);
        this.stage = GameStage.CREATION
        this.activeScene = null;
        this.activeMenu = null;
        this.activeDialog = null;
        this.starters = pickStarters()
        this.dialogStates = {}
        this.seed = randomInt(1, Math.pow(4,10))
        window.gameState = this; //TEMP: DEBUG
    }

    get player(){
        return this.players[0]
    }

    get currentRoom(){
        const roomRef = this.currentDestination.getRoomOrder()[this.currentRoomIndex]
        return this.currentDestination.rooms[roomRef]
    }

    goToNextRoom(){
        const rooms = this.currentDestination.getRoomOrder()
        this.currentRoomIndex++;
        if(this.currentRoomIndex >= rooms.length){
            gameState.day++;
            gameState.activeScene!.scene.start("MapScene")
        } else {
            gameState.initRoom()
        }
    }

    initRoom(){
        clearTimeouts();
        if(gameState.currentRoom.type === RoomType.FREEWALK){
            gameState.activeScene!.scene.start("RoomScene")
        } else {
            gameState.activeScene!.scene.start("GameScene")
        }
    }

    initFight(game: Game){
        closeMenu()
        clearPlacement(game)
        this.stage = GameStage.LAUNCH
        game.time.addEvent({
            delay: 400,
            callback: () => {
                game.hideCenterText();
                for (let pokemon of this.board.playerTeam) {
                    spawnPokemon(pokemon, game)
                }

                if(gameState.currentRoom.type === RoomType.ARENA) {
                    for (let pokemon of this.board.otherTeam) {
                        spawnPokemon(pokemon, game)
                    }
                }
            }
        })

        game.time.addEvent({
            delay: 2000,
            callback: () => {
                this.stage = GameStage.FIGHT
                this.fightTimer = game.time.addEvent({
                    delay: game.gameSpeed,
                    callback: () => this.loopFight(game),
                    callbackScope: this,
                    loop: true
                });
            }
        })
    }

    loopFight(game: Game){
        if(this.stage === GameStage.FIGHT){
            for (let pokemon of this.board.playerTeam) {
                updatePokemonAction(pokemon, this.board, game)
            }
            for (let pokemon of this.board.otherTeam) {
                updatePokemonAction(pokemon, this.board, game)
            }
        }
    }

    endFight(loser: number, game: Game){
        this.stage = GameStage.ENDED;
        const player = game.sprites.get("player")
        const hasWon = (loser !== 1)
        if(hasWon) {
            player && player.play("trainer_victory")
            showCenterText("text_victoire", game).then(() => {})
        } else {
            player && player.play("trainer_defeat")
            showCenterText("text_defaite", game).then(() => {})
        }

        startDialog([
            `Vos Pokemon gagnent 1500xp`,
            `Reptincel passe au niveau 7`
        ]).then(() => {
            if(gameState.currentRoom.type === RoomType.ARENA){
                const arena = gameState.currentRoom as RoomArena
                return startDialog(hasWon
                    ? arena.champion.dialogs.victory
                    : arena.champion.dialogs.defeat
                , { speaker: arena.champion.name })
            }
            return Promise.resolve()
        }).then(() => {
            gameState.goToNextRoom()
        })

    }

    endCapture(game: Game){
        this.stage = GameStage.ENDED;
        const player = game.sprites.get("player")
        player && player.play("trainer_victory")

        wait(100).then(() => {
            if(gameState.currentRoom.type === RoomType.TUTORIAL){
                const arena = gameState.currentRoom as RoomTutorial
                return startDialog(arena.champion.dialogs.victory, { speaker: arena.champion.name })
            }
            return Promise.resolve()
        }).then(() => {
            gameState.goToNextRoom()
        })
    }
}

export const gameState = new GameState();