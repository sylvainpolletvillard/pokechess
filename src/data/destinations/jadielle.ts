import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { gameState } from "../../logic/gamestate";
import { spawnChampionTeam, spawnTrainerTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	type RoomArena,
	RoomType,
} from "../../types/destination";
import { BADGE_TERRE } from "../badges";
import { SHOP_JADIELLE } from "../levels/shops";
import { ABO } from "../pokemons/abo";
import { CHETIFLOR } from "../pokemons/chetiflor";
import { EXCELANGUE } from "../pokemons/excelangue";
import { GROLEM } from "../pokemons/grolem";
import { KOKIYAS } from "../pokemons/kokiyas";
import { MAGICARPE } from "../pokemons/magicarpe";
import { MIAOUSS } from "../pokemons/miaouss";
import { NIDOKING } from "../pokemons/nidoking";
import { NIDOQUEEN } from "../pokemons/nidoqueen";
import { ONIX } from "../pokemons/onix";
import { OSSATUEUR } from "../pokemons/ossatueur";
import { OSSELAIT } from "../pokemons/osselait";
import { RACAILLOU } from "../pokemons/racaillou";
import { RHINOCORNE } from "../pokemons/rhinocorne";
import { RHINOFEROS } from "../pokemons/rhinoferos";
import { SABELETTE } from "../pokemons/sabelette";
import { SMOGO } from "../pokemons/smogo";
import { TRIOPIKEUR } from "../pokemons/triopikeur";
import { GIOVANNI, SBIRE_ROCKET, SBIRE_ROCKET_TUTO } from "../trainers";

const ARENA_GIOVANNI: RoomArena = {
	type: RoomType.ARENA,
	map: "arene_jadielle",
	music: "music_jadielle",
	name: t("destination.JADIELLE_ARENA"),
	trainer: GIOVANNI,
	badge: BADGE_TERRE,
	spawnOtherTeam() {
		return spawnChampionTeam(
			[
				RHINOCORNE,
				TRIOPIKEUR,
				NIDOQUEEN,
				NIDOKING,
				RHINOFEROS,
				OSSATUEUR,
				ONIX,
				GROLEM,
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
};

export const TRAINER: RoomArena = {
	type: RoomType.ARENA,
	map: "arene_jadielle",
	music: "music_jadielle",
	name: t("destination.JADIELLE_ARENA"),
	trainer: SBIRE_ROCKET,
	spawnOtherTeam() {
		return spawnTrainerTeam([
			MIAOUSS,
			ABO,
			SMOGO,
			KOKIYAS,
			EXCELANGUE,
			CHETIFLOR,
			MAGICARPE,
			SABELETTE,
			OSSELAIT,
			RHINOCORNE,
			RACAILLOU,
		]);
	},
};

export const TUTO_SBIRE: RoomArena = {
	type: RoomType.ARENA,
	map: "arene_jadielle",
	music: "music_jadielle",
	name: t("destination.JADIELLE_ARENA"),
	trainer: SBIRE_ROCKET_TUTO,
	spawnOtherTeam() {
		return spawnTrainerTeam([MIAOUSS, ABO, SMOGO]);
	},
};

export const JADIELLE: Destination = {
	ref: "JADIELLE",
	name: t("destination.JADIELLE"),
	nextDestinations: {
		BOURG_PALETTE: [[0, 3]],
		FORET_JADE: [[0, -3]],
		CAVE_TAUPIQUEUR_OUEST: [
			[2, 0],
			[0, -2],
		],
		ROUTE_VICTOIRE_ENTREE: [
			[-3, 0],
			[0, -7],
		],
	},
	coordinates: [5 * 16 - 8, 12 * 16 - 8],
	type: DestinationType.ARENA,
	icons: ["badge_terre", "type_SOL"],
	rooms: {
		arena: ARENA_GIOVANNI,
		tuto_dresseur: TUTO_SBIRE,
		trainer: TRAINER,
		shop: {
			type: RoomType.FREEWALK,
			name: t("destination.JADIELLE_SHOP"),
			music: "music_shop",
			level: SHOP_JADIELLE,
		},
	},
	customRoomOrder() {
		if (gameState.day < 10) return ["shop", "tuto_dresseur"];
		else if (gameState.hasBadge(BADGE_TERRE)) return ["shop", "trainer"];
		else return ["shop", "arena"];
	},
	shopId: 1,
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"shop_jadielle",
			"assets/maps/shop_jadielle.json",
		);
		scene.load.tilemapTiledJSON(
			"arene_jadielle",
			"assets/maps/arene_jadielle.json",
		);
		preloadMusic("music_jadielle", "assets/audio/music/06 Pokemon Gym.mp3");
	},
};
