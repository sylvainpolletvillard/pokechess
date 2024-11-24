import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { spawnTeamByTypeFactor, spawnTrainerTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { FEROSINGE } from "../pokemons/ferosinge";
import { KANGOUREX } from "../pokemons/kangourex";
import { KICKLEE } from "../pokemons/kicklee";
import { MACHOPEUR } from "../pokemons/machopeur";
import { TARTARD } from "../pokemons/tartard";
import { TYGNON } from "../pokemons/tygnon";
import { DRESSEUR_DOJO } from "../trainers";
import {
	TYPE_COMBAT,
	TYPE_FEU,
	TYPE_INSECTE,
	TYPE_NORMAL,
	TYPE_PSY,
} from "../types";

export const DOJO: Destination = {
	ref: "DOJO",
	name: t("destination.DOJO"),
	nextDestinations: {
		SAFRANIA: [[2, 0]],
		CELADOPOLE: [[-3, 0]],
	},
	coordinates: [12 * 16 - 8, 7 * 16 - 8],
	type: DestinationType.WILD,
	icons: ["type_COMBAT"],
	rooms: {
		wild: {
			type: RoomType.WILD,
			name: t("destination.DOJO"),
			map: "dojo",
			music: "music_dojo",
			spawnOtherTeam() {
				return spawnTeamByTypeFactor({
					[TYPE_COMBAT.ref]: 1,
					[TYPE_NORMAL.ref]: 0.2,
					[TYPE_INSECTE.ref]: 0.2,
					[TYPE_FEU.ref]: 0.2,
					[TYPE_PSY.ref]: 0.2,
				});
			},
		},
		trainer: {
			type: RoomType.ARENA,
			name: t("destination.DOJO"),
			map: "dojo",
			music: "music_dojo",
			trainer: DRESSEUR_DOJO,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					TYGNON,
					TYGNON,
					KICKLEE,
					KICKLEE,
					KANGOUREX,
					MACHOPEUR,
					FEROSINGE,
					TARTARD,
				]);
			},
		},
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON("dojo", "assets/maps/dojo.json");
		preloadMusic("music_dojo", "assets/audio/music/15 Rival Appears.mp3");
	},
};
