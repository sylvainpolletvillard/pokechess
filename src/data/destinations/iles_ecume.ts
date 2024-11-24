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
import { AQUALI } from "../pokemons/aquali";
import { ARTIKODIN } from "../pokemons/artikodin";
import { ASPICOT } from "../pokemons/aspicot";
import { CARAPUCE } from "../pokemons/carapuce";
import { KOKIYAS } from "../pokemons/kokiyas";
import { KRABBY } from "../pokemons/krabby";
import { MAGICARPE } from "../pokemons/magicarpe";
import { POISSIRENE } from "../pokemons/poissirene";
import { PSYKOKWAK } from "../pokemons/psykokwak";
import { TENTACOOL } from "../pokemons/tentacool";
import { DRESSEUR_ILES_ECUME } from "../trainers";
import { TYPE_EAU, TYPE_NORMAL, TYPE_PLANTE } from "../types";

export const ILES_ECUME: Destination = {
	ref: "ILES_ECUME",
	name: t("destination.ILES_ECUME"),
	nextDestinations: {
		CRAMOISILE: [[-4, 0]],
		PARMANIE: [
			[3, 0],
			[0, -3],
		],
	},
	coordinates: [10 * 16 - 8, 19 * 16 - 8],
	type: DestinationType.WILD,
	icons: ["type_EAU"],
	rooms: {
		wild: {
			type: RoomType.WILD,
			music: "music_iles_ecume",
			name: "Îles Ecume",
			map: "iles_ecume",
			spawnOtherTeam() {
				if (
					!gameState.pokedexSeen.has(ARTIKODIN.ref) &&
					gameState.day >= 20 &&
					Math.random() < 10 / 100
				) {
					return [
						new PokemonOnBoard({
							entry: ARTIKODIN,
							owner: NO_OWNER,
							level: 50,
							x: 3,
							y: 2,
						}),
					];
				}
				return spawnTeamByTypeFactor({
					[TYPE_EAU.ref]: 1,
					[TYPE_NORMAL.ref]: 0.2,
					[TYPE_PLANTE.ref]: 0.2,
				});
			},
		},
		trainer: {
			type: RoomType.ARENA,
			music: "music_iles_ecume",
			name: t("destination.ILES_ECUME"),
			map: "iles_ecume",
			trainer: DRESSEUR_ILES_ECUME,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					POISSIRENE,
					MAGICARPE,
					ASPICOT,
					KOKIYAS,
					TENTACOOL,
					KRABBY,
					PSYKOKWAK,
					CARAPUCE,
					AQUALI,
				]);
			},
		},
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON("iles_ecume", "assets/maps/iles_ecume.json");
		preloadMusic("music_iles_ecume", "assets/audio/music/35 Ocean.mp3");
	},
};
