import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { spawnChampionTeam, spawnTrainerTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { BADGE_FOUDRE } from "../badges";
import { SHOP_CARMIN } from "../levels/shops";
import { ELECTRODE } from "../pokemons/electrode";
import { ELEKTEK } from "../pokemons/elektek";
import { FANTOMINUS } from "../pokemons/fantominus";
import { MAGMAR } from "../pokemons/magmar";
import { MAGNETI } from "../pokemons/magneti";
import { MAGNETON } from "../pokemons/magneton";
import { PIKACHU } from "../pokemons/pikachu";
import { RAICHU } from "../pokemons/raichu";
import { SMOGO } from "../pokemons/smogo";
import { STARI } from "../pokemons/stari";
import { VOLTALI } from "../pokemons/voltali";
import { VOLTORBE } from "../pokemons/voltorbe";
import { DRESSEUR_CARMIN, MAJOR_BOB } from "../trainers";

export const CARMIN: Destination = {
	ref: "CARMIN",
	name: t("destination.CARMIN"),
	nextDestinations: {
		MAISON_PSY: [[0, -2.5]],
		CAVE_TAUPIQUEUR_EST: [
			[3, 0],
			[0, -1],
		],
		OCEANE_CARMIN: [[-2, 0]],
		FALAISES: [
			[3, 0],
			[2, 0],
		],
	},
	coordinates: [14 * 16 - 8, 11 * 16 - 8],
	type: DestinationType.ARENA,
	icons: ["badge_foudre", "type_ELECTRIQUE"],
	rooms: {
		arena: {
			type: RoomType.ARENA,
			name: t("destination.CARMIN_ARENA"),
			map: "arene_carmin",
			music: "music_carmin",
			trainer: MAJOR_BOB,
			badge: BADGE_FOUDRE,
			spawnOtherTeam() {
				return spawnChampionTeam(
					[
						VOLTORBE,
						PIKACHU,
						RAICHU,
						MAGNETI,
						MAGNETON,
						ELECTRODE,
						ELEKTEK,
						VOLTALI,
					],
					[
						[1, 3],
						[0, 2],
						[6, 2],
						[2, 3],
						[4, 3],
						[5, 3],
						[3, 2],
						[1, 2],
					],
				);
			},
		},
		trainer: {
			type: RoomType.ARENA,
			name: t("destination.CARMIN_ARENA"),
			map: "arene_carmin",
			music: "music_carmin",
			trainer: DRESSEUR_CARMIN,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					VOLTORBE,
					VOLTORBE,
					ELEKTEK,
					PIKACHU,
					SMOGO,
					MAGNETI,
					FANTOMINUS,
					MAGMAR,
					STARI,
				]);
			},
		},
		shop: {
			type: RoomType.FREEWALK,
			name: t("destination.CARMIN_SHOP"),
			music: "music_shop",
			level: SHOP_CARMIN,
		},
	},
	shopId: 7,
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"arene_carmin",
			"assets/maps/arene_carmin.json",
		);
		scene.load.tilemapTiledJSON("shop_carmin", "assets/maps/shop_carmin.json");
		preloadMusic(
			"music_carmin",
			"assets/audio/music/11 Vermilion City's Theme.mp3",
		);
	},
};
