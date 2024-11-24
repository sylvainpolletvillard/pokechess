import { t } from "../../i18n";
import type { LevelConfig } from "../../types/level";

export const END_ROOM: LevelConfig = {
	title: t("room.ligueendroom"),
	tilemap: "endroom",
	tilesets: ["tileset_inside"],
	startAt: "enter",
};
