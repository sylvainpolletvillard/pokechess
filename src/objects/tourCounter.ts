import { Z } from "../data/depths";
import { t } from "../i18n";
import { gameState } from "../logic/gamestate";
import type { MyScene } from "../scenes/MyScene";
import { addText } from "../utils/text";

export function drawTourCounter() {
	const scene = gameState.activeScene as MyScene;
	const bg = scene.add.nineslice(
		scene.scale.width / 2,
		-32,
		"box2",
		undefined,
		160,
		0,
		4,
	);
	bg.setOrigin(0.5, 0.5);

	const text = addText(
		scene.scale.width / 2,
		-30,
		t("day_number", { day: gameState.day }),
		{
			color: "#000",
		},
	);
	text.setOrigin(0.5, 0.5);
	text.setScrollFactor(0);

	bg.setSize(text.width + 24, text.height + 12);
	bg.setScrollFactor(0);
	bg.setDepth(Z.MENU_TOOLTIPS);
	text.setDepth(Z.MENU_TOOLTIPS + 1);

	scene.add.tween({
		targets: [bg, text],
		duration: 400,
		y: "+=38",
		ease: "Linear",
	});
	scene.add.tween({
		targets: [bg, text],
		duration: 400,
		y: -36,
		ease: "Linear",
		delay: 2000,
	});
}
