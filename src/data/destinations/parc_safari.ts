import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { spawnSafariTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";

export const PARC_SAFARI: Destination = {
	ref: "PARC_SAFARI",
	name: t("destination.PARC_SAFARI"),
	nextDestinations: {
		PARMANIE: [[0, 2]],
	},
	coordinates: [13 * 16 - 8, 14 * 16 - 8],
	type: DestinationType.SPECIAL,
	icons: ["safari"],
	subtext: t("destination_subtext.SAFARI"),
	rooms: {
		safari: {
			type: RoomType.SAFARI,
			name: t("destination.PARC_SAFARI"),
			music: "music_safari",
			map: "safari1",
			maps: ["safari1", "safari2", "safari3"],
			spawnOtherTeam: spawnSafariTeam,
		},
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON("safari1", "assets/maps/safari1.json");
		scene.load.tilemapTiledJSON("safari2", "assets/maps/safari2.json");
		scene.load.tilemapTiledJSON("safari3", "assets/maps/safari3.json");
		preloadMusic("music_safari", "assets/audio/music/36 Casino.mp3");
	},
};
