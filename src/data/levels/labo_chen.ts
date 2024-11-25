import { t } from "../../i18n";
import { startDialog } from "../../logic/dialog";
import { gameState } from "../../logic/gamestate";
import type { LevelConfig } from "../../types/level";
import { BOURG_PALETTE } from "../destinations/bourg_palette";

export const chenLevel: LevelConfig = {
	title: t("room.oaklab"),
	tilemap: "labo_chen",
	tilesets: ["tileset_inside"],
	startAt: "labo_exit",
	canExit() {
		if (gameState.player.team.length === 0) {
			startDialog([t("dialog.exitlab.0"), t("dialog.exitlab.1")], {
				speaker: "red",
			});
			return false;
		}
		return true;
	},
	exit() {
		gameState.currentDestination = BOURG_PALETTE;
	},
};
