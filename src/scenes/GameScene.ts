import {setupAnims} from "../logic/anims";
import {GameStage, GameState, gameState} from "../logic/gamestate";
import {handleCursor, setupInputs} from "../logic/inputs";
import {loadSpritesheets} from "../data/spritesheets";
import {loadTilemaps} from "../data/tilemaps";
import {loadSprites} from "../data/sprites";
import {drawGUI, drawIntro, showCenterText, updateGUI} from "../objects/gui";
import {handleClick} from "../objects/cursor";
import {closeMenu} from "../objects/menu";
import {MyScene} from "./MyScene";
import {loadFonts} from "../data/fonts";
import {initPlacement, setupRoomBoard} from "../logic/board";
import {RoomArena, RoomWild} from "../logic/destination";
import {startMusic} from "../logic/audio";

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
    setupInputs(this)
    setupAnims(this.anims)
    this.drawMap();
    drawIntro(this).then(() => drawGUI(this));
    gameState.board = setupRoomBoard(gameState.player, gameState.currentRoom as RoomWild)

    initPlacement(this)
    startMusic(gameState.currentRoom.music)
  }

  update(){
    handleCursor(this)
    updateGUI(this)
  }

  drawMap(){
    const room = gameState.currentRoom as RoomArena
    const map = this.make.tilemap({ key: room.map });
    const tileset = map.addTilesetImage('ground', 'ground');
    const ground0 = map.createLayer("ground0", tileset);
    const ground1 = map.createLayer("ground1", tileset);
    const top0 = map.createLayer("top0", tileset);
  }

  hideCenterText(){
    this.sprites.get("centerText")?.destroy(true);
    this.sprites.delete("centerText")
  }

  launchFight(){
    if(gameState.stage === GameStage.PLACEMENT){
      gameState.initFight(this)
      const player = this.sprites.get("player")
      player && player.play("trainer_launch");
      showCenterText("text_fight", this).then()
    }
  }

  onPressStart(){
    this.launchFight()
  }
  onPressB(){
    if(gameState.activeMenu != null) closeMenu()
  }

  onPressA(){
    handleClick(this)
  }

  onClick(){
    handleClick(this)
  }

  onAllPokemonsCaptured(){

  }

}

