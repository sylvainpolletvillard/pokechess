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
import { BADGE_CASCADE } from "../badges";
import { NO_OWNER } from "../owners";
import { AQUALI } from "../pokemons/aquali";
import { CARAPUCE } from "../pokemons/carapuce";
import { HYPOTREMPE } from "../pokemons/hypotrempe";
import { KOKIYAS } from "../pokemons/kokiyas";
import { KRABBY } from "../pokemons/krabby";
import { LOKHLASS } from "../pokemons/lokhlass";
import { MEWTWO } from "../pokemons/mewtwo";
import { OTARIA } from "../pokemons/otaria";
import { POISSIRENE } from "../pokemons/poissirene";
import { PSYKOKWAK } from "../pokemons/psykokwak";
import { PTITARD } from "../pokemons/ptitard";
import { STARI } from "../pokemons/stari";
import { DRESSEUR_GROTTE_AZUREE } from "../trainers";
import {
	TYPE_DRAGON,
	TYPE_EAU,
	TYPE_GLACE,
	TYPE_ROCHE,
	TYPE_SPECTRE,
} from "../types";

export const GROTTE_AZUREE: Destination = {
	ref: "GROTTE_AZUREE",
	name: t("destination.GROTTE_AZUREE"),
	nextDestinations: {
		AZURIA: [[0, 2]],
	},
	coordinates: [14 * 16 - 8, 8],
	type: DestinationType.WILD,
	icons: ["type_GLACE"],
	locked() {
		return !gameState.hasBadge(BADGE_CASCADE);
	},
	rooms: {
		wild: {
			type: RoomType.WILD,
			music: "music_grotte_azuree",
			name: t("destination.GROTTE_AZUREE"),
			map: "grotte_azuree",
			spawnOtherTeam() {
				if (
					!gameState.pokedexSeen.has(MEWTWO.ref) &&
					gameState.day >= 20 &&
					Math.random() < 10 / 100
				) {
					return [
						new PokemonOnBoard({
							entry: MEWTWO,
							owner: NO_OWNER,
							level: 50,
							x: 3,
							y: 1,
						}),
					];
				}
				return spawnTeamByTypeFactor({
					[TYPE_GLACE.ref]: 0.5,
					[TYPE_EAU.ref]: 0.5,
					[TYPE_DRAGON.ref]: 0.3,
					[TYPE_ROCHE.ref]: 0.2,
					[TYPE_SPECTRE.ref]: 0.1,
				});
			},
		},
		trainer: {
			type: RoomType.ARENA,
			name: t("destination.GROTTE_AZUREE"),
			map: "grotte_azuree",
			music: "music_grotte_azuree",
			trainer: DRESSEUR_GROTTE_AZUREE,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					STARI,
					CARAPUCE,
					PSYKOKWAK,
					PTITARD,
					OTARIA,
					KOKIYAS,
					KRABBY,
					HYPOTREMPE,
					POISSIRENE,
					AQUALI,
					LOKHLASS,
				]);
			},
		},
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"grotte_azuree",
			"assets/maps/grotte_azuree.json",
		);
		preloadMusic(
			"music_grotte_azuree",
			"assets/audio/music/40 Pokemon Mansion.mp3",
		);
	},
};
