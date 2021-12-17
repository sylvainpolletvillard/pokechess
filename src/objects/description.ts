// sprite invisible avec lequel le personnage peut interagir
import {gameState} from "../logic/gamestate";
import {MapObject} from "../utils/map";
import RoomScene from "../scenes/RoomScene";
import {MAP_SCALING, TILE_SIZE} from "../logic/level";

export class Description {
    name: string;
    sprite: Phaser.Physics.Arcade.Sprite

    constructor(obj: MapObject) {
        const scene = gameState.activeScene as RoomScene
        this.sprite = scene.physics.add.sprite(
            obj.x*MAP_SCALING + TILE_SIZE/2,
            obj.y*MAP_SCALING + TILE_SIZE/2,
            "icons16x16"
        )
        this.name = obj.name;
        this.sprite.setSize(obj.width, obj.height)
        this.sprite.body.setSize(10, 10);
        this.sprite.body.immovable = true;
        this.sprite.type = "description";
        this.sprite.setData("name", this.name)
        this.sprite.setData("description", this)
        if(obj.properties.anim){
            this.sprite.play(obj.properties.anim)
        } else {
            this.sprite.setAlpha(0)
        }
    }
}