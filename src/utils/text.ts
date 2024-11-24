import { gameState } from "../logic/gamestate";

export function addText(
	x: number,
	y: number,
	text: string,
	params: object = {},
) {
	return gameState
		.activeScene!.add.text(x, y, text, {
			align: "left",
			color: "black",
			fontSize: "12px",
			fontFamily: "Pokemon",
			strokeThickness: 0,
			shadow: {
				offsetX: 0,
				offsetY: 0,
				color: "#000",
				blur: 0,
				stroke: false,
				fill: false,
			},
			...params,
		})
		.setScrollFactor(0);
}
