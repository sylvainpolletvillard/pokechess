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
import { ELECTHOR } from "../pokemons/electhor";
import { ELEKTEK } from "../pokemons/elektek";
import { MACHOC } from "../pokemons/machoc";
import { MAGNETI } from "../pokemons/magneti";
import { METAMORPH } from "../pokemons/metamorph";
import { PIKACHU } from "../pokemons/pikachu";
import { PORYGON } from "../pokemons/porygon";
import { VOLTALI } from "../pokemons/voltali";
import { VOLTORBE } from "../pokemons/voltorbe";
import { DRESSEUR_CENTRALE } from "../trainers";
import { TYPE_COMBAT, TYPE_EAU, TYPE_ELECTRIQUE, TYPE_NORMAL } from "../types";

export const CENTRALE: Destination = {
	ref: "CENTRALE",
	name: t("destination.CENTRALE"),
	nextDestinations: {
		AZURIA: [
			[0, -1],
			[-1, 0],
			[0, -1],
			[-2, 0],
		],
		OCEANE_AZURIA: [
			[0, -1],
			[-1, 0],
			[0, -1],
			[0, -1],
			[1, 0],
			[0, -1],
		],
		LAVANVILLE: [
			[1, 0],
			[0, 1],
			[1, 0],
			[0, 1],
		],
	},
	coordinates: [17 * 16 - 8, 5 * 16 - 8],
	type: DestinationType.WILD,
	icons: ["type_ELECTRIQUE"],
	rooms: {
		wild: {
			type: RoomType.WILD,
			name: t("destination.CENTRALE"),
			music: "music_centrale",
			map: "centrale",
			spawnOtherTeam() {
				if (
					!gameState.pokedexSeen.has(ELECTHOR.ref) &&
					gameState.day >= 20 &&
					Math.random() < 10 / 100
				) {
					return [
						new PokemonOnBoard({
							entry: ELECTHOR,
							owner: NO_OWNER,
							level: 50,
							x: 3,
							y: 2,
						}),
					];
				}
				return spawnTeamByTypeFactor({
					[TYPE_ELECTRIQUE.ref]: 1,
					[TYPE_NORMAL.ref]: 0.5,
					[TYPE_EAU.ref]: 0.5,
					[TYPE_COMBAT.ref]: 0.2,
				});
			},
		},
		trainer: {
			type: RoomType.ARENA,
			name: t("destination.CENTRALE"),
			music: "music_centrale",
			map: "centrale",
			trainer: DRESSEUR_CENTRALE,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					MAGNETI,
					ELEKTEK,
					PIKACHU,
					VOLTALI,
					VOLTORBE,
					PORYGON,
					MACHOC,
					METAMORPH,
				]);
			},
		},
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON("centrale", "assets/maps/centrale.json");
		preloadMusic(
			"music_centrale",
			"assets/audio/music/37 Team Rocket Hideout.mp3",
		);
	},
};
