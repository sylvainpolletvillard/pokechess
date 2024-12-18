import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { spawnTeamByTypeFactor, spawnTrainerTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	type RoomArena,
	RoomType,
	type RoomWild,
} from "../../types/destination";
import { HYPOTREMPE } from "../pokemons/hypotrempe";
import { KOKIYAS } from "../pokemons/kokiyas";
import { KRABBY } from "../pokemons/krabby";
import { LOKHLASS } from "../pokemons/lokhlass";
import { MACHOC } from "../pokemons/machoc";
import { MAGICARPE } from "../pokemons/magicarpe";
import { OTARIA } from "../pokemons/otaria";
import { POISSIRENE } from "../pokemons/poissirene";
import { RAMOLOSS } from "../pokemons/ramoloss";
import { STARI } from "../pokemons/stari";
import { TADMORV } from "../pokemons/tadmorv";
import { DRESSEUR_OCEANE } from "../trainers";
import { TYPE_COMBAT, TYPE_EAU, TYPE_NORMAL, TYPE_VOL } from "../types";

export const OCEANE_WILD: RoomWild = {
	type: RoomType.WILD,
	music: "music_oceane",
	name: t("destination.OCEANE_DECK"),
	map: "oceane",
	spawnOtherTeam() {
		return spawnTeamByTypeFactor({
			[TYPE_EAU.ref]: 1,
			[TYPE_VOL.ref]: 0.2,
			[TYPE_NORMAL.ref]: 0.1,
			[TYPE_COMBAT.ref]: 0.1,
		});
	},
};

function preload(scene: MyScene) {
	scene.load.tilemapTiledJSON("oceane", "assets/maps/oceane.json");
	preloadMusic("music_oceane", "assets/audio/music/13 St. Anne.mp3");
}

export const OCEANE_TRAINER: RoomArena = {
	type: RoomType.ARENA,
	music: "music_oceane",
	name: t("destination.OCEANE_DECK"),
	map: "oceane",
	trainer: DRESSEUR_OCEANE,
	spawnOtherTeam() {
		return spawnTrainerTeam([
			POISSIRENE,
			MACHOC,
			STARI,
			HYPOTREMPE,
			LOKHLASS,
			RAMOLOSS,
			MAGICARPE,
			KRABBY,
			OTARIA,
			KOKIYAS,
			TADMORV,
		]);
	},
};

export const OCEANE_CARMIN: Destination = {
	ref: "OCEANE_CARMIN",
	name: t("destination.OCEANE"),
	nextDestinations: {
		CARMIN: [[2, 0]],
	},
	coordinates: [12 * 16 - 8, 11 * 16 - 8],
	type: DestinationType.SPECIAL,
	icons: ["boat"],
	subtext: t("destination_subtext.fast_travel_CRAMOISILE"),
	rooms: {
		wild: OCEANE_WILD,
		trainer: OCEANE_TRAINER,
	},
	preload,
};

export const OCEANE_CRAMOISILE: Destination = {
	ref: "OCEANE_CRAMOISILE",
	name: t("destination.OCEANE"),
	nextDestinations: {
		CRAMOISILE: [[2, 0]],
	},
	coordinates: [4 * 16 - 8, 19 * 16 - 8],
	type: DestinationType.SPECIAL,
	icons: ["boat"],
	subtext: t("destination_subtext.fast_travel_AZURIA"),
	rooms: {
		wild: OCEANE_WILD,
		trainer: OCEANE_TRAINER,
	},
	preload,
};

export const OCEANE_AZURIA: Destination = {
	ref: "OCEANE_AZURIA",
	name: t("destination.OCEANE"),
	nextDestinations: {
		AZURIA: [
			[0, 1],
			[-1, 0],
			[0, 1],
			[-2, 0],
		],
		CENTRALE: [
			[0, 1],
			[-1, 0],
			[0, 1],
			[0, 1],
			[1, 0],
			[0, 1],
		],
	},
	coordinates: [17 * 16 - 8, 8],
	type: DestinationType.SPECIAL,
	icons: ["boat"],
	subtext: t("destination_subtext.fast_travel_CARMIN"),
	rooms: {
		wild: OCEANE_WILD,
		trainer: OCEANE_TRAINER,
	},
	preload,
};
