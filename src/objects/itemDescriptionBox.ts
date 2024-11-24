import { Z } from "../data/depths";
import type { Item } from "../data/items";
import { gameState } from "../logic/gamestate";
import type { MyScene } from "../scenes/MyScene";
import { addText } from "../utils/text";
import { makeItemSprite } from "./itemBox";

let itemDescriptionGroup: Phaser.GameObjects.Group | null;

export function showItemDescription(item: Item) {
	if (itemDescriptionGroup) hideItemDescription();
	if (!item) return;

	const scene = gameState.activeScene as MyScene;
	itemDescriptionGroup = scene.add.group().setOrigin(0, 0);

	const height = 64;
	const ox = 24;
	const oy = scene.scale.height - height - 32;

	const background = scene.add
		.nineslice(
			ox,
			oy, // this is the starting x/y location
			"box1", // a key to an already loaded image
			undefined,
			scene.scale.width - 32,
			height, // the width and height of your object
			8,
			8,
			8,
			8, // the width and height to offset for a corner slice
		)
		.setOrigin(0, 0)
		.setScrollFactor(0);

	itemDescriptionGroup.add(background);

	const itemSprite = makeItemSprite(item)
		.setPosition(ox + 28, oy + 32)
		.setScrollFactor(0);
	itemDescriptionGroup.add(itemSprite);

	itemDescriptionGroup.add(
		addText(ox + 56, oy + 8, item.label, {
			fontStyle: "strong",
			color: "blue",
		}),
	);
	itemDescriptionGroup.add(
		addText(ox + 56, oy + 28, item.desc, {
			wordWrap: {
				width: scene.scale.width - 96,
				useAdvancedWrap: true,
			},
		}),
	);
	itemDescriptionGroup.setDepth(Z.MENU);
}

export function hideItemDescription() {
	if (itemDescriptionGroup) {
		itemDescriptionGroup.destroy(true);
		itemDescriptionGroup = null;
	}
}
