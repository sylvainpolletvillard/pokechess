import { GameStage, gameState } from "../logic/gamestate";
import type GameScene from "../scenes/GameScene";
import { addText } from "../utils/text";
import { hideAllianceInfoBox, showAllianceInfoBox } from "./allianceInfoBox";
import { addInteractiveElem } from "./cursor";
import type { PokemonOnBoard } from "./pokemon";

let leftGroup: Phaser.GameObjects.Group | null = null;
let rightGroup: Phaser.GameObjects.Group | null = null;

export function drawAlliancesInfo(team: PokemonOnBoard[]) {
	const game = gameState.activeScene as GameScene;
	const left = team === gameState.board.playerTeam;
	const alliances = left
		? gameState.board.playerAlliances
		: gameState.board.otherTeamAlliances;
	const listAlliances = [...alliances.values()]
		.sort((a, b) => {
			if (a.stepReachedN !== b.stepReachedN)
				return b.stepReachedN - a.stepReachedN;
			return b.numberOfThatTypeInTeam - a.numberOfThatTypeInTeam;
		})
		.slice(0, 10);

	if (left && leftGroup) leftGroup.destroy(true, true);
	else if (!left && rightGroup) rightGroup.destroy(true, true);

	const group = game.add.group();
	if (left) leftGroup = group;
	else rightGroup = group;

	let i = 0;

	listAlliances.forEach((allianceState) => {
		// only show incomplete alliances for player on placement stage
		if (
			!allianceState.stepReached &&
			(!left || gameState.stage !== GameStage.PLACEMENT)
		)
			return;

		const x = left ? 14 : game.scale.width - 14;
		const y = left ? game.scale.height - 74 - i * 24 : 74 + i * 24;
		const d = left ? +1 : -1;
		const counterGraphics = game.add.graphics();

		counterGraphics.fillStyle(0x000000, 0.5).fillCircle(x, y + 4, 9);

		const cx = left ? x + 10 : x - 28;
		for (let c = 0; c < 3; c++) {
			counterGraphics
				.fillStyle(c < allianceState.stepReachedN ? 0xffffff : 0x111111, 1)
				.fillRoundedRect(
					cx + (left ? 0 : 12) + (c * 6 + 1) * d,
					y + 9,
					5,
					2,
					1,
				);
		}

		group.add(counterGraphics);

		const nextStep =
			allianceState.stepReached ||
			allianceState.steps[allianceState.stepReachedN] ||
			allianceState.steps.at(-1);
		group.add(
			addText(
				left ? x + 10 : x - 10,
				y + 2,
				`${allianceState.numberOfThatTypeInTeam}/${nextStep.numberRequired}`,
				{
					color: allianceState.stepReached ? "white" : "#AAAAAA",
					strokeThickness: 2,
					stroke: "black",
				},
			).setOrigin(left ? 0 : 1, 0.5),
		);

		const typeSprite = game.add.sprite(
			x,
			y + 4,
			"icons16x16",
			allianceState.type.frameIndex,
		);
		if (!allianceState.stepReached) typeSprite.setAlpha(0.35);
		group.add(typeSprite);

		addInteractiveElem(typeSprite);
		typeSprite
			.on("over", () => showAllianceInfoBox(allianceState.type, left ? 0 : 1))
			.on("out", () => hideAllianceInfoBox());

		i++;
	});
}

export function hideAlliancesInfo() {
	leftGroup?.destroy(true);
	rightGroup?.destroy(true);
	hideAllianceInfoBox();
}
