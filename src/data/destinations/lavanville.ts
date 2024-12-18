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
import { SHOP_LAVANVILLE } from "../levels/shops";
import { CANINOS } from "../pokemons/caninos";
import { EVOLI } from "../pokemons/evoli";
import { FANTOMINUS } from "../pokemons/fantominus";
import { GRODOUDOU } from "../pokemons/grodoudou";
import { LEVEINARD } from "../pokemons/leveinard";
import { MELODELFE } from "../pokemons/melodelfe";
import { MELOFEE } from "../pokemons/melofee";
import { MEW } from "../pokemons/mew";
import { MIAOUSS } from "../pokemons/miaouss";
import { MR_MIME } from "../pokemons/mrmime";
import { PAPILUSION } from "../pokemons/papilusion";
import { RONDOUDOU } from "../pokemons/rondoudou";
import { TAUROS } from "../pokemons/tauros";
import { DRESSEUR_LAVANVILLE, SALLY, SALLY_DIALOG_STATE } from "../trainers";

export const LAVANVILLE: Destination = {
	ref: "LAVANVILLE",
	name: t("destination.LAVANVILLE"),
	nextDestinations: {
		CENTRALE: [
			[0, -1],
			[-1, 0],
			[0, -1],
			[-1, 0],
		],
		TOUR_POKEMON: [[-3, 0]],
		FALAISES: [[0, 4]],
	},
	coordinates: [19 * 16 - 8, 7 * 16 - 8],
	type: DestinationType.ARENA,
	icons: ["type_FEE"],
	rooms: {
		arena: {
			type: RoomType.ARENA,
			name: t("destination.LAVANVILLE_ARENA"),
			map: "arene_lavanville",
			spawnOtherTeam() {
				return spawnChampionTeam(
					[
						MELOFEE,
						MELODELFE,
						RONDOUDOU,
						GRODOUDOU,
						MR_MIME,
						LEVEINARD,
						PAPILUSION,
						MEW,
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
			music: "music_lavanville",
			trainer: SALLY,
		},
		trainer: {
			type: RoomType.ARENA,
			name: t("destination.LAVANVILLE_ARENA"),
			map: "arene_lavanville",
			music: "music_lavanville",
			trainer: DRESSEUR_LAVANVILLE,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					MELOFEE,
					RONDOUDOU,
					MR_MIME,
					FANTOMINUS,
					MIAOUSS,
					CANINOS,
					EVOLI,
					TAUROS,
				]);
			},
		},
		shop: {
			type: RoomType.FREEWALK,
			name: t("destination.LAVANVILLE_SHOP"),
			music: "music_shop",
			level: SHOP_LAVANVILLE,
		},
	},
	shopId: 4,
	customRoomOrder() {
		if (gameState.dialogStates["sally"] === SALLY_DIALOG_STATE.BEATEN)
			return ["shop", "trainer"];
		return ["shop", "arena"];
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"arene_lavanville",
			"assets/maps/arene_lavanville.json",
		);
		scene.load.tilemapTiledJSON(
			"shop_lavanville",
			"assets/maps/shop_lavanville.json",
		);
		preloadMusic(
			"music_lavanville",
			"assets/audio/music/12 Lavender Town's Theme.mp3",
		);
	},
};
