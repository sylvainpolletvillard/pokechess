import type { PokemonOnBoard } from "../../objects/pokemon";
import type { MyScene } from "../../scenes/MyScene";
import {
	type Destination,
	DestinationType,
	RoomType,
} from "../../types/destination";
import type { Trainer } from "../../types/trainer";

export const TEST_ROOM = (otherTeam: PokemonOnBoard[]): Destination => {
	return {
		ref: "TEST_ROOM",
		name: "Testing Room",
		nextDestinations: {},
		coordinates: [72, 136],
		type: DestinationType.SPECIAL,
		icons: ["type_INSECTE"],
		rooms: {
			test: {
				type: RoomType.ARENA,
				trainer: TEST_TRAINER,
				name: "Testing Room",
				map: "foret_de_jade",
				music: "music_foret_jade",
				spawnOtherTeam() {
					return otherTeam;
				},
			},
		},
		preload(scene: MyScene) {
			scene.load.tilemapTiledJSON(
				"foret_de_jade",
				"assets/maps/foret_de_jade.json",
			);
		},
	};
};

export const TEST_TRAINER: Trainer = {
	ref: "test_trainer",
	name: "test_trainer",
	frameIndex: 8,
	introFrameIndex: 0,
	dialogs: {
		start: [],
		victory: ["victory"],
		defeat: ["defeat"],
	},
};
