import { t } from "../../i18n";
import { preloadMusic } from "../../logic/audio";
import { spawnTeamByTypeFactor, spawnTrainerTeam } from "../../logic/spawns";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import { ABO } from "../pokemons/abo";
import { ELEKTEK } from "../pokemons/elektek";
import { FANTOMINUS } from "../pokemons/fantominus";
import { MIAOUSS } from "../pokemons/miaouss";
import { NIDORAN_MALE } from "../pokemons/nidoranm";
import { SCARABRUTE } from "../pokemons/scarabrute";
import { SMOGO } from "../pokemons/smogo";
import { TADMORV } from "../pokemons/tadmorv";
import { VOLTORBE } from "../pokemons/voltorbe";
import { DRESSEUR_PISTE_CYCLABLE } from "../trainers";
import { TYPE_ELECTRIQUE, TYPE_NORMAL, TYPE_POISON } from "../types";

export const PISTE_CYCLABLE: Destination = {
	ref: "PISTE_CYCLABLE",
	name: t("destination.PISTE_CYCLABLE"),
	nextDestinations: {
		CELADOPOLE: [[0, -5]],
		PARMANIE: [
			[0, 4],
			[4, 0],
		],
	},
	coordinates: [9 * 16 - 8, 12 * 16 - 8],
	type: DestinationType.WILD,
	icons: ["type_POISON"],
	rooms: {
		wild: {
			type: RoomType.WILD,
			name: t("destination.PISTE_CYCLABLE"),
			map: "piste_cyclable",
			music: "music_piste_cyclable",
			spawnOtherTeam() {
				return spawnTeamByTypeFactor({
					[TYPE_POISON.ref]: 1,
					[TYPE_NORMAL.ref]: 0.4,
					[TYPE_ELECTRIQUE.ref]: 0.4,
				});
			},
		},
		trainer: {
			type: RoomType.ARENA,
			name: t("destination.PISTE_CYCLABLE"),
			map: "piste_cyclable",
			music: "music_piste_cyclable",
			trainer: DRESSEUR_PISTE_CYCLABLE,
			spawnOtherTeam() {
				return spawnTrainerTeam([
					SMOGO,
					ABO,
					MIAOUSS,
					TADMORV,
					NIDORAN_MALE,
					FANTOMINUS,
					SCARABRUTE,
					ELEKTEK,
					VOLTORBE,
				]);
			},
		},
	},
	preload(scene: MyScene) {
		scene.load.tilemapTiledJSON(
			"piste_cyclable",
			"assets/maps/piste_cyclable.json",
		);
		preloadMusic("music_piste_cyclable", "assets/audio/music/34 Cycling.mp3");
	},
};
