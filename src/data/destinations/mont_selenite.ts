import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { spawnTeamByTypeFactor, spawnTrainerTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { pickRandomIn } from "../../utils/helpers";
import { receiveItem } from "../dialogs/descriptions";
import { FOSSILES } from "../items";
import { EVOLI } from "../pokemons/evoli";
import { MELOFEE } from "../pokemons/melofee";
import { OSSELAIT } from "../pokemons/osselait";
import { PORYGON } from "../pokemons/porygon";
import { RACAILLOU } from "../pokemons/racaillou";
import { RONDOUDOU } from "../pokemons/rondoudou";
import { SABELETTE } from "../pokemons/sabelette";
import { STARI } from "../pokemons/stari";
import { TAUPIQUEUR } from "../pokemons/taupiqueur";
import { DRESSEUR_MONT_SELENITE } from "../trainers";
import {
	TYPE_EAU,
	TYPE_FEE,
	TYPE_ROCHE,
	TYPE_SOL,
	TYPE_SPECTRE,
} from "../types";

export const MONT_SELENITE: Destination = {
	ref: "MONT_SELENITE",
	name: t("destination.MONT_SELENITE"),
	nextDestinations: {
		COL_DE_MONTAGNE: [
			[0, 1],
			[-2, 0],
		],
		AZURIA: [
			[0, 1],
			[4, 0],
		],
	},
	coordinates: [10 * 16 - 8, 2 * 16 - 8],
	type: DestinationType.SPECIAL,
	icons: ["type_FEE"],
	subtext: "Paléontologie et Capture",
	rooms: {
		wild: {
			type: RoomType.WILD,
			name: t("destination.MONT_SELENITE"),
			map: "mont_selenite",
			music: "music_cave",
			spawnOtherTeam() {
				return spawnTeamByTypeFactor({
					[TYPE_FEE.ref]: 1,
					[TYPE_SOL.ref]: 0.5,
					[TYPE_ROCHE.ref]: 0.5,
					[TYPE_EAU.ref]: 0.5,
					[TYPE_SPECTRE.ref]: 0.2,
				});
			},
			beforeExit() {
				return receiveItem(pickRandomIn(FOSSILES), 1, true, "finding");
			},
		},
		trainer: {
			type: RoomType.ARENA,
			name: t("destination.MONT_SELENITE"),
			map: "mont_selenite",
			music: "music_cave",
			trainer: DRESSEUR_MONT_SELENITE,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					MELOFEE,
					RONDOUDOU,
					STARI,
					EVOLI,
					PORYGON,
					RACAILLOU,
					SABELETTE,
					TAUPIQUEUR,
					OSSELAIT,
				]);
			},
		},
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"mont_selenite",
			"assets/maps/mont_selenite.json",
		);
		preloadMusic("music_cave", "assets/audio/music/39 Mt. Moon Cave.mp3");
	},
};
