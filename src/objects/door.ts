import { playSound } from "../logic/audio";
import { gameState } from "../logic/gamestate";
import { MAP_SCALING } from "../logic/level";
import type RoomScene from "../scenes/RoomScene";
import { fadeIn, fadeOut } from "../utils/camera";
import type { MapObject } from "../utils/map";

export class Door {
	sprite: Phaser.Physics.Arcade.Sprite;

	constructor(door: MapObject) {
		const scene = gameState.activeScene as RoomScene;
		this.sprite = scene.physics.add
			.sprite(door.x * MAP_SCALING, door.y * MAP_SCALING, "collisions")
			.setOrigin(0, 0)
			.setAlpha(0);
		this.sprite.body?.setSize(
			door.width * MAP_SCALING,
			door.height * MAP_SCALING,
			false,
		);
		this.sprite.setData("type", "door");
		this.sprite.setData("action", () => {
			if (!door.properties.to) return; // one-way doors
			if (door.properties.to === "exit" && scene.level.canExit() === false) {
				// can't exit, move back
				scene.player?.moveBack(1);
				setTimeout(() => {
					scene.disableTriggers = false;
				}, 500);
				return;
			}

			playSound("door");
			scene.disableTriggers = true; // to avoid triggers while changing level
			fadeOut(250).then(() => {
				if (door.properties.to === "exit") {
					scene.level.exit();
				} else {
					fadeIn(250);
					scene.player!.goToDoor(door.properties.to);
				}
			});
		});
	}
}
