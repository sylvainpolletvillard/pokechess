import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { gameState } from "../../logic/gamestate";
import { spawnTeamByTypeFactor, spawnTrainerTeam } from "../../logic/spawns";
import { PokemonOnBoard } from "../../objects/pokemon";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { NO_OWNER } from "../owners";
import { MINIDRACO } from "../pokemons/minidraco";
import { REPTINCEL } from "../pokemons/reptincel";
import { RONFLEX } from "../pokemons/ronflex";
import { DRESSEUR_COLLINE_ROYALE } from "../trainers";
import { TYPE_COMBAT, TYPE_DRAGON, TYPE_VOL } from "../types";

export const COLLINE_ROYALE: Destination = {
	ref: "COLLINE_ROYALE",
	name: t("destination.COLLINE_ROYALE"),
	nextDestinations: {
		ARGENTA: [
			[-2, 0],
			[-2, 0],
		],
		CELADOPOLE: [
			[-2, 0],
			[0, 2],
		],
	},
	coordinates: [11 * 16 - 8, 5 * 16 - 8],
	type: DestinationType.WILD,
	icons: ["type_DRAGON"],
	rooms: {
		wild: {
			type: RoomType.WILD,
			name: t("destination.COLLINE_ROYALE"),
			map: "colline_royale",
			music: "music_colline_royale",
			spawnOtherTeam() {
				return spawnTeamByTypeFactor({
					[TYPE_DRAGON.ref]: 1,
					[TYPE_VOL.ref]: 0.5,
					[TYPE_COMBAT.ref]: 0.2,
				});
			},
		},
		trainer: {
			type: RoomType.ARENA,
			name: t("destination.COLLINE_ROYALE"),
			map: "colline_royale",
			music: "music_colline_royale",
			trainer: DRESSEUR_COLLINE_ROYALE,
			spawnOtherTeam() {
				return spawnTrainerTeam([MINIDRACO, MINIDRACO, REPTINCEL]);
			},
		},
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"ronflex_endormi",
			"assets/maps/ronflex_endormi.json",
		);
		scene.load.tilemapTiledJSON(
			"colline_royale",
			"assets/maps/colline_royale.json",
		);
		preloadMusic(
			"music_colline_royale",
			"assets/audio/music/03 To Bill's Origin - From Cerulean.mp3",
		);
	},
};

export const RONFLEX_ENDORMI: Destination = {
	ref: "RONFLEX_ENDORMI",
	name: t("destination.CHEMIN_COLLINE"),
	nextDestinations: {},
	coordinates: [11 * 16 - 8, 5 * 16 - 8],
	type: DestinationType.WILD,
	icons: ["type_NORMAL"],
	rooms: {
		wild: {
			type: RoomType.WILD,
			name: t("destination.CHEMIN_COLLINE"),
			map: "ronflex_endormi",
			music: "music_colline_royale",
			spawnOtherTeam() {
				return [
					new PokemonOnBoard({
						entry: RONFLEX,
						owner: NO_OWNER,
						level: 30,
						x: 3,
						y: 3,
					}),
				];
			},
		},
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"ronflex_endormi",
			"assets/maps/ronflex_endormi.json",
		);
	},
	onExit() {
		gameState.wokeUpRonflex = true;
		gameState.currentDestination = COLLINE_ROYALE;
	},
};
