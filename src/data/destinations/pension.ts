import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { gameState } from "../../logic/gamestate";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { DRESSEUR_PENSION } from "../trainers";

export const PENSION: Destination = {
	ref: "PENSION",
	name: t("destination.PENSION"),
	nextDestinations: {
		AZURIA: [[0, -2]],
		SAFRANIA: [[0, 2]],
	},
	coordinates: [14 * 16 - 8, 5 * 16 - 8],
	type: DestinationType.SPECIAL,
	icons: ["type_NORMAL"],
	subtext: "Élevage",
	rooms: {
		pension: {
			name: t("destination.PENSION"),
			type: RoomType.PENSION,
			trainer: DRESSEUR_PENSION,
			music: "music_pension_et_camp_nomade",
			map: "pension",
			spawnOtherTeam() {
				return gameState.pension;
			},
		},
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON("pension", "assets/maps/pension.json");
		preloadMusic(
			"music_pension_et_camp_nomade",
			"assets/audio/music/47 Pikachu's Beach.mp3",
		);
	},
};
