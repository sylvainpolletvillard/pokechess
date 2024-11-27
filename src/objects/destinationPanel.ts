import { Z } from "../data/depths";
import { getSubText } from "../logic/destination";
import type MapScene from "../scenes/MapScene";
import { type Destination, DestinationType } from "../types/destination";
import { addText } from "../utils/text";

let destinationPanel: Phaser.GameObjects.Container | null = null;

export const DestinationTypeSubtextColor: {
	[type in DestinationType]: string;
} = {
	[DestinationType.ARENA]: "#006699",
	[DestinationType.WILD]: "#669900",
	[DestinationType.SPECIAL]: "#996600",
} as const;

export function showDestinationPanel(
	destination: Destination,
	scene: MapScene,
) {
	destinationPanel?.destroy(true);
	const DESTNAME_HEIGHT = 32;
	destinationPanel = scene.add.container(
		scene.scale.width - 8,
		scene.scale.height - 6,
	);

	const subtextColor =
		DestinationTypeSubtextColor[destination.type as DestinationType];

	const destName = addText(-4, 2, destination.name)
		.setOrigin(1, 0)
		.setDepth(Z.MENU_TOOLTIPS);

	const subtext = addText(
		-6 - destination.icons.length * 16,
		+16,
		getSubText(destination),
		{ color: subtextColor },
	)
		.setOrigin(1, 0)
		.setDepth(Z.MENU_TOOLTIPS);

	const width =
		Math.max(destName.width, subtext.width + destination.icons.length * 16) +
		12;
	const bg = scene.add
		.nineslice(-width, 0, "box2", undefined, width, DESTNAME_HEIGHT, 4, 4, 4, 4)
		.setOrigin(0, 0)
		.setDepth(Z.MENU_LAYOUT);

	destinationPanel?.add(bg);
	destinationPanel?.add(subtext);
	destinationPanel?.add(destName);

	destination.icons.forEach((icon: string, i: number) => {
		const iconSprite = scene.add.sprite(-12 - i * 16, 22, "gui", 0);
		iconSprite.play(icon).setDepth(Z.MENU_OBJECTS);
		destinationPanel?.add(iconSprite);
	});

	scene.tweens.add({
		targets: [destinationPanel],
		y: "-=34",
		duration: 200,
	});
}

export function hideDestinationPanel(scene: MapScene) {
	if (!destinationPanel) return;
	scene.tweens.add({
		targets: [destinationPanel],
		y: "+=40",
		delay: 100,
		duration: 100,
		onComplete() {
			destinationPanel?.destroy(true);
			destinationPanel = null;
		},
	});
}
