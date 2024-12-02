import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { gameState } from "../../logic/gamestate";
import { spawnChampionTeam, spawnTrainerTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { SHOP_CAMP_NOMADE } from "../levels/shops";
import { ABO } from "../pokemons/abo";
import { AEROMITE } from "../pokemons/aeromite";
import { ASPICOT } from "../pokemons/aspicot";
import { BOUSTIFLOR } from "../pokemons/boustiflor";
import { CHENIPAN } from "../pokemons/chenipan";
import { COCONFORT } from "../pokemons/coconfort";
import { DARDARGNAN } from "../pokemons/dardargnan";
import { INSECATEUR } from "../pokemons/insecateur";
import { MIMITOSS } from "../pokemons/mimitoss";
import { NOADKOKO } from "../pokemons/noadkoko";
import { PAPILUSION } from "../pokemons/papilusion";
import { PARAS } from "../pokemons/paras";
import { PARASECT } from "../pokemons/parasect";
import { PIKACHU } from "../pokemons/pikachu";
import { SCARABRUTE } from "../pokemons/scarabrute";
import { DRESSEUR_CAMP_NOMADE, HECTOR, HECTOR_DIALOG_STATE } from "../trainers";

export const CAMP_NOMADE: Destination = {
	ref: "CAMP_NOMADE",
	name: t("destination.CAMP_NOMADE"),
	nextDestinations: {
		CHAMPS_VERDOYANTS: [
			[-2, 0],
			[0, 1],
		],
		FALAISES: [[0, -3]],
	},
	coordinates: [19 * 16 - 8, 14 * 16 - 8],
	type: DestinationType.ARENA,
	icons: ["type_INSECTE"],
	rooms: {
		arena: {
			type: RoomType.ARENA,
			name: t("destination.CAMP_NOMADE_ARENA"),
			map: "camp_nomade",
			music: "music_pension_et_camp_nomade",
			trainer: HECTOR,
			spawnOtherTeam() {
				return spawnChampionTeam(
					[
						COCONFORT,
						MIMITOSS,
						AEROMITE,
						DARDARGNAN,
						PAPILUSION,
						PARASECT,
						INSECATEUR,
						SCARABRUTE,
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
			name: t("destination.CAMP_NOMADE_ARENA"),
			map: "camp_nomade",
			music: "music_pension_et_camp_nomade",
			trainer: DRESSEUR_CAMP_NOMADE,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					CHENIPAN,
					SCARABRUTE,
					PARAS,
					ASPICOT,
					MIMITOSS,
					INSECATEUR,
					BOUSTIFLOR,
					NOADKOKO,
					ABO,
					PIKACHU,
				]);
			},
		},
		shop: {
			/*
            trouver un truc plus original qu'un shop,
            genre collectionneurs d'insectes qui offrent des objets
             */
			type: RoomType.FREEWALK,
			name: t("destination.CAMP_NOMADE"),
			music: "music_shop",
			level: SHOP_CAMP_NOMADE,
		},
	},
	customRoomOrder() {
		if (gameState.dialogStates.hector === HECTOR_DIALOG_STATE.BEATEN)
			return ["shop", "trainer"];
		return ["shop", "arena"];
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"shop_camp_nomade",
			"assets/maps/shop_camp_nomade.json",
		);
		scene.load.tilemapTiledJSON("camp_nomade", "assets/maps/camp_nomade.json");
		preloadMusic(
			"music_pension_et_camp_nomade",
			"assets/audio/music/47 Pikachu's Beach.mp3",
		);
	},
};
