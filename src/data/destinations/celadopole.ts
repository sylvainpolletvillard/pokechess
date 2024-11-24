import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { spawnChampionTeam, spawnTrainerTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { BADGE_PRISME } from "../badges";
import { SHOP_CELADOPOLE } from "../levels/shops";
import { BOUSTIFLOR } from "../pokemons/boustiflor";
import { BULBIZARRE } from "../pokemons/bulbizarre";
import { CHETIFLOR } from "../pokemons/chetiflor";
import { EMPIFLOR } from "../pokemons/empiflor";
import { FLORIZARRE } from "../pokemons/florizarre";
import { HERBIZARRE } from "../pokemons/herbizarre";
import { MYSTHERBE } from "../pokemons/mystherbe";
import { NOADKOKO } from "../pokemons/noadkoko";
import { NOEUFNOEUF } from "../pokemons/noeufnoeuf";
import { ORTIDE } from "../pokemons/ortide";
import { PAPILUSION } from "../pokemons/papilusion";
import { PARAS } from "../pokemons/paras";
import { RAFFLESIA } from "../pokemons/rafflesia";
import { SAQUEDENEU } from "../pokemons/saquedeneu";
import { TAUPIQUEUR } from "../pokemons/taupiqueur";
import { DRESSEUR_CELADOPOLE, ERIKA } from "../trainers";

export const CELADOPOLE: Destination = {
	ref: "CELADOPOLE",
	name: t("destination.CELADOPOLE"),
	nextDestinations: {
		ARGENTA: [
			[0, -2],
			[-2, 0],
		],
		COLLINE_ROYALE: [
			[0, -2],
			[2, 0],
		],
		DOJO: [[3, 0]],
		PISTE_CYCLABLE: [[0, 5]],
	},
	coordinates: [9 * 16 - 8, 7 * 16 - 8],
	type: DestinationType.ARENA,
	icons: ["badge_prisme", "type_PLANTE"],
	rooms: {
		arena: {
			type: RoomType.ARENA,
			name: t("destination.CELADOPOLE_ARENA"),
			map: "arene_celadopole",
			music: "music_celadopole",
			trainer: ERIKA,
			badge: BADGE_PRISME,
			spawnOtherTeam() {
				return spawnChampionTeam(
					[
						SAQUEDENEU,
						ORTIDE,
						BOUSTIFLOR,
						HERBIZARRE,
						NOADKOKO,
						RAFFLESIA,
						EMPIFLOR,
						FLORIZARRE,
					],
					[
						[2, 3],
						[1, 0],
						[3, 3],
						[4, 3],
						[1, 3],
						[6, 0],
						[6, 3],
						[5, 3],
					],
				);
			},
		},
		trainer: {
			type: RoomType.ARENA,
			name: t("destination.CELADOPOLE_ARENA"),
			map: "arene_celadopole",
			music: "music_celadopole",
			trainer: DRESSEUR_CELADOPOLE,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					MYSTHERBE,
					MYSTHERBE,
					BULBIZARRE,
					CHETIFLOR,
					NOEUFNOEUF,
					PARAS,
					PAPILUSION,
					SAQUEDENEU,
					TAUPIQUEUR,
				]);
			},
		},
		shop: {
			type: RoomType.FREEWALK,
			name: t("destination.CELADOPOLE_SHOP"),
			music: "music_shop",
			level: SHOP_CELADOPOLE,
		},
	},
	shopId: 6,
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"arene_celadopole",
			"assets/maps/arene_celadopole.json",
		);
		scene.load.tilemapTiledJSON(
			"shop_celadopole",
			"assets/maps/shop_celadopole.json",
		);
		preloadMusic(
			"music_celadopole",
			"assets/audio/music/09 Celadon City's Theme.mp3",
		);
	},
};
