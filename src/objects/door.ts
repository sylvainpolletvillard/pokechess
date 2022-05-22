import {gameState} from "../logic/gamestate";
import RoomScene from "../scenes/RoomScene";
import {MAP_SCALING} from "../logic/level";
import {MapObject} from "../utils/map";
import { playSound } from "../logic/audio";
import { fadeIn, fadeOut } from "../utils/camera";

export class Door {
    sprite: Phaser.Physics.Arcade.Sprite;

    constructor(door: MapObject) {
        const scene = gameState.activeScene as RoomScene
        this.sprite = scene.physics.add.sprite(
            door.x*MAP_SCALING,
            door.y*MAP_SCALING,
            "collisions"
        )
            .setOrigin(0,0)
            .setAlpha(0)
        this.sprite.body.setSize(door.width*MAP_SCALING, door.height*MAP_SCALING, false)
        this.sprite.setData("type", "door")
        this.sprite.setData("action", () => {
            playSound("door")
            scene.disableTriggers = true;  // to avoid triggers while changing level
            if(door.properties.to === "exit" && scene.level.canExit() === false){
                // can't exit, move back
                scene.player?.moveBack(1);
                setTimeout(() => {
                    scene.disableTriggers = false;
                }, 500)
                return;
            }

            fadeOut(250).then(() => {
                if(door.properties.to === "exit"){
                    scene.level.exit()
                } else {
                    fadeIn(250)
                    scene.player!.goToDoor(door.properties.to)
                }
            })
        })
    }
}