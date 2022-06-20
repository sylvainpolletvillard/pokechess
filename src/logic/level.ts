import RoomScene from "../scenes/RoomScene";
import {findObjectsByType, MapObject} from "../utils/map";
import {Character, Trader, CHARACTER_STATE} from "../objects/character";
import {gameState} from "./gamestate";
import {Description} from "../objects/description";
import {Door} from "../objects/door";
import {LevelConfig} from "../types/level";

export const MAP_SCALING = 2
export const TILE_SIZE = 16 * MAP_SCALING

export class Level {
    config: LevelConfig
    tilemap?: Phaser.Tilemaps.Tilemap
    layer_collisions?: Phaser.Tilemaps.TilemapLayer
    layer_ground0?: Phaser.Tilemaps.TilemapLayer
    //layer_ground1?: Phaser.Tilemaps.TilemapLayer
    //layer_top?: Phaser.Tilemaps.TilemapLayer

    constructor(config: LevelConfig) {
        this.config = config
    }

    create(){
        this.tilemap = gameState.activeScene!.add.tilemap(this.config.tilemap)
        this.tilemap.addTilesetImage("interior")

        this.layer_collisions = this.tilemap.createLayer("collisions", "interior")
        this.layer_collisions.setVisible(false).setScale(2)
        this.layer_ground0 = this.tilemap.createLayer("ground0", "interior")
        this.layer_ground0.setScale(2)

        //this.layer_ground1 = this.tilemap.createLayer("ground1", "interior")
        //this.layer_top = this.tilemap.createLayer("top", "interior")

        // collisions
        this.layer_collisions.setCollisionBetween(0,999)

        this.createGroups()
        this.createCharacters();
        this.createObjects();
        this.createTriggers();
        if (this.config.init) this.config.init.call(this);
    }

    clearTileMap() {
        this.tilemap?.destroy()
        this.layer_ground0?.destroy()
        //this.layer_ground1?.destroy()
        //this.layer_top?.destroy()
        this.layer_collisions?.destroy()
    }

    createGroups() {
        const scene = gameState.activeScene as RoomScene
        if (scene.groups && scene.groups.render) {
            let toRemove = scene.groups.render;
            setTimeout(() => toRemove.destroy(), 100); // good enough
        }

        scene.groups = {}

        scene.groups.characters = scene.add.group([], { key:"characters" });
        scene.groups.characters.enableBody = true
        scene.groups.characters.add(scene.player?.sprite)

        scene.groups.objects = scene.add.group([], { key: "objects" })
        scene.groups.objects.enableBody = true

        scene.groups.triggers = scene.add.group([], { key: "triggers" });
        scene.groups.triggers.enableBody = true

        //this.layer_top?.bringToTop();

        scene.groups.hud = scene.add.group([], { key: "hud" });
    }

    createCharacters() {
        const scene = gameState.activeScene as RoomScene
        findObjectsByType("character", this.tilemap).forEach((character:any) => {
            let characterName = character.name;
            let state = character.properties.state;
            let interactionDistance = character.properties.interactionDistance ?? 1
            let pnj;
            if(characterName === "trader"){
                pnj = new Trader( { x: character.x / 16, y: character.y / 16 }, characterName, state as CHARACTER_STATE, interactionDistance)
            } else {
                pnj = new Character( { x: character.x / 16, y: character.y / 16 }, characterName, state as CHARACTER_STATE, interactionDistance)
            } 
            character.sprite = pnj.sprite;
            scene.groups.characters.add(pnj.sprite)
        })
    }

    createObjects() {
        const scene = gameState.activeScene as RoomScene
        findObjectsByType("description", this.tilemap).forEach((obj:any) => {
            let description = new Description(obj)
            scene.groups.objects.add(description.sprite)
        })
    }

    createTriggers() {
        const scene = gameState.activeScene as RoomScene;
        const doors = findObjectsByType("door", this.tilemap)
        doors.forEach((doorData: MapObject) => {
           const door = new Door(doorData)
           scene.groups.triggers.add(door.sprite)
        })
    }

    canExit(){
        return this.config.canExit ? this.config.canExit() : true;
    }

    exit() {
        this.clearTileMap();
        gameState.activeScene!.physics.world.colliders.destroy();
        this.config.exit?.call(this)
        gameState.afterEnd(true)
    }
}