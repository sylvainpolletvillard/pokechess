import {handleCursor, setupInputs} from "../logic/inputs";
import {gameState} from "../logic/gamestate";
import {MyScene} from "./MyScene";
import {Level} from "../logic/level";
import {PlayerCharacter} from "../objects/character_player";
import {loadFonts} from "../data/fonts";
import {loadSprites} from "../data/sprites";
import {loadSpritesheets} from "../data/spritesheets";
import {loadTilemaps} from "../data/tilemaps";
import {setupAnims} from "../logic/anims";
import {drawRoomNamePanel} from "../objects/roomNamePanel";
import {RoomFreewalk} from "../logic/destination";
import {homeLevel} from "../data/levels/home";
import {startMusic} from "../logic/audio";
import {clickEntry} from "../objects/menu";

export default class RoomScene extends MyScene {

    player: PlayerCharacter | null;
    groups: any;
    level: Level;
    disableTriggers: boolean;

    constructor() {
        super('RoomScene')
        this.disableTriggers = false
        this.player = null
        this.level = new Level(homeLevel);
    }

    preload() {
        loadFonts(this)
        loadSprites(this)
        loadSpritesheets(this);
        loadTilemaps(this);
    }

    create() {
        const room = gameState.currentRoom as RoomFreewalk
        this.level = new Level(room.level)
        gameState.activeScene = this
        setupInputs(this)
        setupAnims(this.anims)

        //this.scale.setGameSize(160,160)
        this.physics.world.setBounds(0, 0, 1600, 1600);

        this.player = new PlayerCharacter()
        this.level.create()
        this.physics.add.collider(this.player.sprite, this.level.layer_collisions!)

        this.children.bringToTop(this.player.sprite)
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.setBackgroundColor("black")

        this.disableTriggers = false;

        if(!room.level.startAt) console.error(`No entrance door found for level ${room.name}`)
        else {
            this.disableTriggers = true
            this.player.goToDoor(room.level.startAt)
        }

        drawRoomNamePanel()
        startMusic(room.music)
    }

    update() {
        if (!this.level) return;

        handleCursor(this)

        if (!this.disableTriggers && this.player?.sprite) {
            //overlaps
            this.physics.overlap(this.groups.triggers, this.player.sprite, this.onTrigger, undefined, this)
        }

        this.groups.characters.getChildren().forEach((sprite: Phaser.GameObjects.Sprite) => {
            const character = sprite.getData("character");
            sprite.depth = sprite.y * 0.001; // depth sorting
            character?.update()
        })
    }

    onTrigger(trigger: any) {
        const action = trigger.getData('action');
        action && action();
    }

    onPressA(){
        if(gameState.activeMenu != null) return clickEntry()
        this.player?.doAction()
    }
}
