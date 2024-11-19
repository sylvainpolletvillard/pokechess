import {
	Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { spawnTutoCaptureTeam } from "../../logic/spawns";
import { ASSISTANT } from "../trainers";
import { homeLevel } from "../levels/home";
import { chenLevel } from "../levels/labo_chen";
import { MyScene } from "../../scenes/MyScene";
import { gameState } from "../../logic/gamestate";
import { MAM_DIALOG_STATE } from "../dialogs/mam";
import { t } from "../../i18n";

export const BOURG_PALETTE: Destination = {
	ref: "BOURG_PALETTE",
	name: t("destination.BOURG_PALETTE"),
	rooms: {
		home: {
			name: t("destination.HOME"),
			type: RoomType.FREEWALK,
			level: homeLevel,
			music: "music_labo_chen",
		},
		labo: {
			name: t("destination.LABO_CHEN"),
			type: RoomType.FREEWALK,
			level: chenLevel,
			music: "music_labo_chen",
		},
		tuto: {
			name: t("destination.BOURG_PALETTE_ROAD"),
			type: RoomType.TUTORIAL,
			map: "foret_de_jade",
			music: "music_guide",
			trainer: ASSISTANT,
			spawnOtherTeam() {
				return spawnTutoCaptureTeam();
			},
		},
	},
	customRoomOrder() {
		if (gameState.day === 0) return ["labo", "tuto"];
		else {
			gameState.dialogStates.mam = MAM_DIALOG_STATE.hello;
			return ["home"];
		}
	},
	nextDestinations: {
		JADIELLE: [[0, -3]],
		CRAMOISILE: [
			[1, 0],
			[0, 1.5],
			[0, 2.5],
		],
		MONT_BRAISE: [
			[1, 0],
			[0, 1.5],
			[-3, 0.5],
		],
	},
	coordinates: [5 * 16 - 8, 15 * 16 - 8],
	type: DestinationType.SPECIAL,
	icons: ["gift"],
	subtext: t("destination_subtext.BOURG_PALETTE"),
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"bourg_palette",
			"assets/maps/bourg_palette.json",
		);
	},
};
