import Phaser from "phaser";
import {Destination, RoomArena, RoomTutorial, RoomType} from "./destination";
import {Player} from "./player";
import {Board, calcXpBoard, clearPlacement, setupPlayerIdleBoard, spawnPokemon} from "./board";
import {updatePokemonAction} from "./fight";
import GameScene from "../scenes/GameScene";
import {closeMenu, Menu} from "../objects/menu";
import {Dialog, DialogLine, startDialog} from "./dialog";
import {showCenterText} from "../objects/gui";
import { MyScene } from "../scenes/MyScene"
import {Pokemon} from "../data/pokemons";
import {pickStarters} from "./starters";
import {BOURG_PALETTE, TEST_ROOM} from "../data/destinations/bourg_palette";
import {clearTimeouts, randomInt, wait} from "../utils/helpers";
import { Badge } from "../data/badges";
import { SCIENTIFIQUE_TUTO_DIALOG_STATE } from "../data/trainers";
import { checkProjectilesImpact } from "./projectile";
import { updatePokemonInfoBox } from "../objects/pokemonInfoBox";
import { updateAlterations } from "./alteration";

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
        // @ts-ignore
        window.gameState = this; //TEMP: DEBUG
    }

    get player(){
        return this.players[0]
    }

    get currentRoom(){
        const roomRef = this.currentDestination.getRoomOrder()[this.currentRoomIndex]
        return this.currentDestination.rooms[roomRef]
    }

    hasBadge(badge: Badge){
        return gameState.player.badges.includes(badge.ref)
    }

    receiveBadge(badge: Badge){
        if(!gameState.player.badges.includes(badge.ref)){
            gameState.player.badges.push(badge.ref)
        }
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

    initFight(game: GameScene){
        closeMenu()
        clearPlacement(game)
        gameState.board.xpEarned = calcXpBoard()
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
                    callback: this.loopFight,
                    callbackScope: this,
                    loop: true
                });
            }
        })
    }

    loopFight(){
        const game = gameState.activeScene as GameScene;
        if(this.stage === GameStage.FIGHT){
            for (let pokemon of this.board.playerTeam) {
                updatePokemonAction(pokemon, this.board, game)
            }
            for (let pokemon of this.board.otherTeam) {
                updatePokemonAction(pokemon, this.board, game)
            }
            checkProjectilesImpact(game)
            updateAlterations([...gameState.board.playerTeam, ...gameState.board.otherTeam]);
            updatePokemonInfoBox()
        }
    }

    endFight(loser: number){        
        const game = gameState.activeScene as GameScene;
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

        let xpPerPokemon = (gameState.board.xpEarned || 0) / gameState.player.team.length
        xpPerPokemon = Math.max(1, Math.ceil(xpPerPokemon))

        const lines: DialogLine[] = [];
        if(hasWon){
            lines.push(`Vos Pokémon gagnent ${Math.round(xpPerPokemon/10)}xp`)
        } else if(gameState.currentRoom.type !== RoomType.TUTORIAL){
            lines.push(`Vous courrez jusqu'au centre Pokémon le plus proche.`)
        }

        gameState.board.playerTeam.forEach(pokemon => {
            const oldLvl = pokemon.level
            pokemon.gainXP(xpPerPokemon)
            if(oldLvl !== pokemon.level) lines.push(`${pokemon.name} passe au niveau ${pokemon.level}`)
        })

        startDialog(lines).then(() => {
            if([RoomType.ARENA, RoomType.TUTORIAL].includes(gameState.currentRoom.type)){
                const arena = gameState.currentRoom as RoomArena
                return startDialog(hasWon
                    ? arena.trainer.dialogs.victory
                    : arena.trainer.dialogs.defeat
                , { speaker: arena.trainer.name })
            }
            return Promise.resolve()
        }).then(() => {
            gameState.afterEnd()
        })
    }

    endCapture(){
        const game = gameState.activeScene as GameScene;
        this.stage = GameStage.ENDED;
        const player = game.sprites.get("player")
        player && player.play("trainer_victory")

        return wait(100).then(() => {
            if(gameState.currentRoom.type === RoomType.TUTORIAL){
                const room = gameState.currentRoom as RoomTutorial
                let dialog = room.trainer.dialogs.victory
                if(gameState.dialogStates["scientifique_tuto"] === SCIENTIFIQUE_TUTO_DIALOG_STATE.AFTER_WILD){
                    dialog = room.trainer.dialogs.step3
                }
                return startDialog(dialog, { speaker: room.trainer.name })
            }
        }).then(() => {
            gameState.afterEnd()
        })
    }

    afterEnd(){        
        if(gameState.currentRoom.type === RoomType.TUTORIAL 
        && gameState.dialogStates["scientifique_tuto"] === SCIENTIFIQUE_TUTO_DIALOG_STATE.BEFORE_WILD){
            const room = gameState.currentRoom as RoomTutorial
            return startDialog(room.trainer.dialogs.step2, { 
                speaker: room.trainer.name 
            })
        } else {
            gameState.goToNextRoom()
        }
    }
}

export const gameState = new GameState();