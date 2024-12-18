import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { spawnTeamByTypeFactor, spawnTrainerTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { CANARTICHO } from "../pokemons/canarticho";
import { CANINOS } from "../pokemons/caninos";
import { DODUO } from "../pokemons/doduo";
import { MIMITOSS } from "../pokemons/mimitoss";
import { NOSFERAPTI } from "../pokemons/nosferapti";
import { PIAFABEC } from "../pokemons/piafabec";
import { ROUCOOL } from "../pokemons/roucool";
import { SALAMECHE } from "../pokemons/salameche";
import { DRESSEUR_COL_DE_MONTAGNE } from "../trainers";
import {
	TYPE_EAU,
	TYPE_GLACE,
	TYPE_NORMAL,
	TYPE_ROCHE,
	TYPE_VOL,
} from "../types";

export const COL_DE_MONTAGNE: Destination = {
	ref: "COL_DE_MONTAGNE",
	name: t("destination.COL_MONTAGNE"),
	nextDestinations: {
		ARGENTA: [
			[0, 1],
			[-1, 0],
			[0, 1],
		],
		MONT_SELENITE: [[2, 0]],
		AZURIA: [
			[2, 0],
			[4, 0],
		],
	},
	coordinates: [8 * 16 - 8, 3 * 16 - 8],
	type: DestinationType.WILD,
	icons: ["type_VOL"],
	rooms: {
		wild: {
			type: RoomType.WILD,
			name: t("destination.COL_MONTAGNE"),
			music: "music_col_montagne",
			map: "col_de_montagne",
			spawnOtherTeam() {
				return spawnTeamByTypeFactor({
					[TYPE_VOL.ref]: 1,
					[TYPE_NORMAL.ref]: 0.2,
					[TYPE_GLACE.ref]: 0.2,
					[TYPE_ROCHE.ref]: 0.2,
					[TYPE_EAU.ref]: 0.1,
				});
			},
		},
		trainer: {
			type: RoomType.ARENA,
			name: t("destination.COL_MONTAGNE"),
			map: "col_de_montagne",
			music: "music_col_montagne",
			trainer: DRESSEUR_COL_DE_MONTAGNE,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					ROUCOOL,
					PIAFABEC,
					CANINOS,
					NOSFERAPTI,
					DODUO,
					SALAMECHE,
					MIMITOSS,
					CANARTICHO,
				]);
			},
		},
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"col_de_montagne",
			"assets/maps/col_de_montagne.json",
		);
		preloadMusic(
			"music_col_montagne",
			"assets/audio/music/20 The Road to Cerulean - from Mt. Moon.mp3",
		);
	},
};
