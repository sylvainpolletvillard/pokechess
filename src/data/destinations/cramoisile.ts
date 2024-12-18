import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { spawnChampionTeam, spawnTrainerTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { BADGE_VOLCAN } from "../badges";
import { SHOP_CRAMOISILE } from "../levels/shops";
import { AEROMITE } from "../pokemons/aeromite";
import { ARBOK } from "../pokemons/arbok";
import { ARCANIN } from "../pokemons/arcanin";
import { CANINOS } from "../pokemons/caninos";
import { DRACAUFEU } from "../pokemons/dracaufeu";
import { FEUNARD } from "../pokemons/feunard";
import { GALOPA } from "../pokemons/galopa";
import { GOUPIX } from "../pokemons/goupix";
import { GROTADMORV } from "../pokemons/grotadmorv";
import { MAGMAR } from "../pokemons/magmar";
import { PONYTA } from "../pokemons/ponyta";
import { RAFFLESIA } from "../pokemons/rafflesia";
import { SMOGO } from "../pokemons/smogo";
import { SMOGOGO } from "../pokemons/smogogo";
import { TADMORV } from "../pokemons/tadmorv";
import { TENTACRUEL } from "../pokemons/tentacruel";
import { AUGUSTE, DRESSEUR_CRAMOISILE } from "../trainers";

export const CRAMOISILE: Destination = {
	ref: "CRAMOISILE",
	name: t("destination.CRAMOISILE"),
	coordinates: [6 * 16 - 8, 19 * 16 - 8],
	type: DestinationType.ARENA,
	icons: ["badge_volcan", "type_FEU"],
	nextDestinations: {
		BOURG_PALETTE: [
			[0, -2.5],
			[0, -1.5],
			[-1, 0],
		],
		MONT_BRAISE: [
			[0, -2.5],
			[-3, 0.5],
		],
		OCEANE_CRAMOISILE: [[-2, 0]],
		ILES_ECUME: [[4, 0]],
	},
	rooms: {
		arena: {
			name: t("destination.CRAMOISILE_ARENA"),
			type: RoomType.ARENA,
			map: "cramoisile",
			music: "music_cramoisile",
			trainer: AUGUSTE,
			badge: BADGE_VOLCAN,
			spawnOtherTeam() {
				return spawnChampionTeam(
					[
						CANINOS,
						ARCANIN,
						PONYTA,
						GALOPA,
						GOUPIX,
						FEUNARD,
						MAGMAR,
						DRACAUFEU,
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
			name: t("destination.CRAMOISILE_ARENA"),
			type: RoomType.ARENA,
			map: "cramoisile",
			music: "music_cramoisile",
			trainer: DRESSEUR_CRAMOISILE,
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
			name: t("destination.CRAMOISILE_SHOP"),
			music: "music_shop",
			level: SHOP_CRAMOISILE,
		},
	},
	shopId: 9,
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON("cramoisile", "assets/maps/cramoisile.json");
		scene.load.tilemapTiledJSON(
			"shop_cramoisile",
			"assets/maps/shop_cramoisile.json",
		);
		preloadMusic(
			"music_cramoisile",
			"assets/audio/music/10 Cinnabar Island's Theme.mp3",
		);
	},
};
