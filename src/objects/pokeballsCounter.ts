import { gameState } from "../logic/gamestate";
import type { MyScene } from "../scenes/MyScene";
import RoomScene from "../scenes/RoomScene";
import { RoomType } from "../types/destination";
import { addText } from "../utils/text";

let pokeballsCounterGroup: Phaser.GameObjects.Group;

export function drawPokeballsCounter() {
	const scene = gameState.activeScene as MyScene;
	if (pokeballsCounterGroup != null) pokeballsCounterGroup.destroy(true, true);

	let ox = game.scale.width - 64;

	if (
		[RoomType.TUTORIAL, RoomType.PENSION, RoomType.ARENA].includes(
			gameState.currentRoom.type,
		)
	) {
		ox = -16;
	}

	let pokeballPos = [ox, -16];
	let counterPos = [ox + 40, 8];

	if (scene instanceof RoomScene) {
		counterPos = [28, 8];
		pokeballPos = [-16, -16];
	}
	const pokeball = scene.add.sprite(
		pokeballPos[0],
		pokeballPos[1],
		"pokeball",
		0,
	);
	pokeball
		.play(`POKEBALL_${pokeballsCounterGroup ? "jiggle_once" : "in"}`)
		.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () =>
			pokeball.play("POKEBALL_idle"),
		)
		.setOrigin(0, 0)
		.setScrollFactor(0);

	scene.sprites.set("pokeball", pokeball);
	const pokeballCount = addText(
		counterPos[0],
		counterPos[1],
		gameState.player.inventory.pokeball.toString(),
		{
			align: "left",
			color: "white",
		},
	);
	pokeballCount.setStroke("#000000", 3);
	pokeballsCounterGroup = scene.add.group([pokeball, pokeballCount]);
}

export function hidePokeballsCounter() {
	if (!pokeballsCounterGroup) return;
	pokeballsCounterGroup.destroy(true);
}
