import {setupAnims} from "../logic/anims";
import {GameStage, GameState, gameState} from "../logic/gamestate";
import {handleCursor, setupInputs} from "../logic/inputs";
import {loadSpritesheets} from "../data/spritesheets";
import {loadTilemaps} from "../data/tilemaps";
import {loadSprites} from "../data/sprites";
import { showCenterText, updateGUI} from "../objects/gui";
import {hideMenuButtons} from "../objects/menuButtons";
import {handleClick} from "../objects/cursor";
import {clickEntry, closeMenu} from "../objects/menu";
import {MyScene} from "./MyScene";
import {loadFonts} from "../data/fonts";
import {getNumberMaxAllowedOnBoard, initPlacement, initSafari, setupRoomBoard, setupSafariBoard} from "../logic/board";
import {RoomArena, RoomBoard, RoomSafari, RoomType} from "../logic/destination";
import {startMusic} from "../logic/audio";
import { drawPokeballsCounter } from '../objects/pokeballsCounter';
import { drawRoomNamePanel } from '../objects/roomNamePanel';
import { drawTrainers, showTrainerIntro } from '../objects/trainers';
import { startDialog } from "../logic/dialog";
import { randomInt, wait } from "../utils/helpers";
import { CHAMPIONS } from "../data/trainers";

export default class GameScene extends MyScene {
  gameSpeed: number = 100;
  state: GameState;

  constructor() {
    super('GameScene');
    // @ts-ignore
    window.game = this; //TODO: remove global
    this.state = gameState;
  }

  preload() {
    loadFonts(this)
    loadSprites(this)
    loadSpritesheets(this);
    loadTilemaps(this);
  }

  create() {
    gameState.activeScene = this
    const room = gameState.currentRoom as RoomBoard
    setupInputs(this)
    setupAnims(this.anims)
    this.drawMap();
    this.drawIntro().then(() => {
      if(room.type === RoomType.SAFARI){        
        initSafari(this)
      } else {        
        initPlacement(this)
      }
      
    });

    if(room.type === RoomType.SAFARI){
      gameState.board = setupSafariBoard(room)
    } else {
      gameState.board = setupRoomBoard(gameState.player, room)
    }
    
    startMusic(room.music)
  }

  update(){
    handleCursor(this)
    updateGUI(this)
  }

  drawMap(){
    const room = gameState.currentRoom as RoomBoard
    if(room.type === RoomType.SAFARI){
      (room as RoomSafari).safariMapIndex = randomInt(1,3)
      room.map = `safari${(room as RoomSafari).safariMapIndex}`
    }
    const map = this.make.tilemap({ key: room.map });
    const tileset = map.addTilesetImage('ground', 'ground');
    const ground0 = map.createLayer("ground0", tileset);
    const ground1 = map.createLayer("ground1", tileset);
    const top0 = map.createLayer("top0", tileset);
  }
  
  drawIntro(): Promise<any>{
    drawRoomNamePanel()
    drawTrainers(this)

    if(gameState.currentRoom.type === RoomType.WILD || gameState.currentRoom.type === RoomType.SAFARI){
        return wait(1000).then(() => {
            drawPokeballsCounter()
            return showCenterText("text_capture", this)
        })
    }

    if(gameState.currentRoom.type === RoomType.ARENA || gameState.currentRoom.type === RoomType.TUTORIAL){
        const arena = gameState.currentRoom as RoomArena
        showTrainerIntro(arena.trainer).then(() => {})
        return wait(2000).then(() => startDialog(arena.trainer.dialogs.start, { speaker: arena.trainer.name }))
    }

    return Promise.resolve()
  }

  hideCenterText(){
    this.sprites.get("centerText")?.destroy(true);
    this.sprites.delete("centerText")
  }

  get canLaunchFight(){
    return gameState.stage === GameStage.PLACEMENT 
    && gameState.board.playerTeam.length <= getNumberMaxAllowedOnBoard()
  }

  launchFight(){
    if(this.canLaunchFight){
      hideMenuButtons()
      gameState.initFight(this)
      const player = this.sprites.get("player")
      wait(500).then(() => player && player.play("trainer_launch"));
      showCenterText("text_fight", this)
      if(gameState.currentRoom.type === RoomType.WILD) startMusic("music_battle_wild")
      else if(CHAMPIONS.includes((gameState.currentRoom as RoomArena).trainer)) startMusic("music_battle_champion")
      else startMusic("music_battle_trainer")
    }
  }

  onPressStart(){
    this.launchFight()
  }
  onPressB(){
    if(gameState.activeMenu != null) closeMenu()
  }

  onPressA(){
    if(gameState.activeMenu != null) clickEntry()
    else handleClick(this)
  }

  onClick(){
    handleClick(this)
  }

}

