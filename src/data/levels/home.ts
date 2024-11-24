import { t } from "../../i18n";
import type { LevelConfig } from "../../types/level";

export const homeLevel: LevelConfig = {
	title: t("room.home"),
	tilemap: "bourg_palette",
	tilesets: ["tileset_inside"],
	startAt: "home_exit",
};
