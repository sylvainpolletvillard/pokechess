import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { spawnChampionTeam, spawnTrainerTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { BADGE_AME } from "../badges";
import { SHOP_PARMANIE } from "../levels/shops";
import { AEROMITE } from "../pokemons/aeromite";
import { ARBOK } from "../pokemons/arbok";
import { GROTADMORV } from "../pokemons/grotadmorv";
import { RAFFLESIA } from "../pokemons/rafflesia";
import { SMOGO } from "../pokemons/smogo";
import { SMOGOGO } from "../pokemons/smogogo";
import { TADMORV } from "../pokemons/tadmorv";
import { TENTACRUEL } from "../pokemons/tentacruel";
import { DRESSEUR_PARMANIE, KOGA } from "../trainers";

export const PARMANIE: Destination = {
	ref: "PARMANIE",
	name: t("destination.PARMANIE"),
	nextDestinations: {
		PARC_SAFARI: [[0, -2]],
		PISTE_CYCLABLE: [
			[-4, 0],
			[0, -4],
		],
		ILES_ECUME: [
			[0, 3],
			[-3, 0],
		],
		CHAMPS_VERDOYANTS: [
			[3, 0],
			[0, -1],
			[1, 0],
		],
	},
	coordinates: [13 * 16 - 8, 16 * 16 - 8],
	type: DestinationType.ARENA,
	icons: ["badge_ame", "type_POISON"],
	subtext: "Arène",
	rooms: {
		arena: {
			type: RoomType.ARENA,
			name: t("destination.PARMANIE_ARENA"),
			map: "arene_parmanie",
			music: "music_parmanie",
			trainer: KOGA,
			badge: BADGE_AME,
			spawnOtherTeam() {
				return spawnChampionTeam(
					[
						SMOGO,
						SMOGOGO,
						TADMORV,
						GROTADMORV,
						ARBOK,
						AEROMITE,
						TENTACRUEL,
						RAFFLESIA,
					],
					[
						[2, 3],
						[4, 3],
						[3, 3],
						[0, 2],
						[1, 2],
						[6, 2],
						[5, 2],
						[3, 0],
					],
				);
			},
		},
		trainer: {
			type: RoomType.ARENA,
			name: t("destination.PARMANIE_ARENA"),
			map: "arene_parmanie",
			music: "music_parmanie",
			trainer: DRESSEUR_PARMANIE,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					SMOGO,
					SMOGOGO,
					TADMORV,
					GROTADMORV,
					ARBOK,
					AEROMITE,
					TENTACRUEL,
					RAFFLESIA,
				]);
			},
		},
		shop: {
			type: RoomType.FREEWALK,
			name: t("destination.PARMANIE_SHOP"),
			music: "music_shop",
			level: SHOP_PARMANIE,
		},
	},
	shopId: 8,
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"arene_parmanie",
			"assets/maps/arene_parmanie.json",
		);
		scene.load.tilemapTiledJSON(
			"shop_parmanie",
			"assets/maps/shop_parmanie.json",
		);
		preloadMusic("music_parmanie", "assets/audio/music/40 Pokemon Mansion.mp3");
	},
};
