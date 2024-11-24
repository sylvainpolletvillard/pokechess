import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { spawnTeamByTypeFactor, spawnTrainerTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { CANINOS } from "../pokemons/caninos";
import { ONIX } from "../pokemons/onix";
import { PIAFABEC } from "../pokemons/piafabec";
import { RACAILLOU } from "../pokemons/racaillou";
import { RHINOCORNE } from "../pokemons/rhinocorne";
import { SABELETTE } from "../pokemons/sabelette";
import { SALAMECHE } from "../pokemons/salameche";
import { SAQUEDENEU } from "../pokemons/saquedeneu";
import { DRESSEUR_FALAISES } from "../trainers";
import { TYPE_EAU, TYPE_ROCHE, TYPE_SOL, TYPE_VOL } from "../types";

export const FALAISES: Destination = {
	ref: "FALAISES",
	name: t("destination.FALAISES"),
	nextDestinations: {
		LAVANVILLE: [[0, -4]],
		CARMIN: [
			[-2, 0],
			[-3, 0],
		],
		CAMP_NOMADE: [[0, 3]],
		CAVE_TAUPIQUEUR_EST: [
			[-2, 0],
			[0, -1],
		],
	},
	coordinates: [19 * 16 - 8, 11 * 16 - 8],
	type: DestinationType.WILD,
	icons: ["type_ROCHE"],
	rooms: {
		wild: {
			type: RoomType.WILD,
			name: t("destination.FALAISES"),
			map: "falaises",
			music: "music_falaises",
			spawnOtherTeam() {
				return spawnTeamByTypeFactor({
					[TYPE_ROCHE.ref]: 1,
					[TYPE_EAU.ref]: 1,
					[TYPE_VOL.ref]: 1,
					[TYPE_SOL.ref]: 0.5,
				});
			},
		},
		trainer: {
			type: RoomType.ARENA,
			name: t("destination.FALAISES"),
			map: "falaises",
			music: "music_falaises",
			trainer: DRESSEUR_FALAISES,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					RACAILLOU,
					ONIX,
					CANINOS,
					RHINOCORNE,
					SALAMECHE,
					PIAFABEC,
					SAQUEDENEU,
					SABELETTE,
				]);
			},
		},
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON("falaises", "assets/maps/falaises.json");
		preloadMusic(
			"music_falaises",
			"assets/audio/music/21 The Road to Lavender Town from Vermilion.mp3",
		);
	},
};
