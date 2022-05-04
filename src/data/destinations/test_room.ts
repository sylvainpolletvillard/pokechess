import { Destination, DestinationType, RoomType } from "../../logic/destination"
import { PokemonOnBoard } from "../../objects/pokemon"
import { Trainer } from "../trainers"

export const TEST_ROOM = (otherTeam: PokemonOnBoard[]): Destination => {
    return {
        ref: "TEST_ROOM",
        name: "Testing Room",
        nextDestinations: {},
        coordinates: [72,136],
        type: DestinationType.SPECIAL,
        icons: ["type_INSECTE"],
        rooms: {
            test: {
                type: RoomType.ARENA,
                trainer: TEST_TRAINER,
                name: "Testing Room",
                map: "foret_de_jade",
                music: "music_foret_jade",
                spawnOtherTeam(){
                    return otherTeam
                },
            }
        }
    }
}

export const TEST_TRAINER: Trainer = {
    name: "test_trainer",
    frameIndex: 8,
    introFrameIndex: 0,
    dialogs:{
        start: [],
        victory: ["victory"],
        defeat: ["defeat"]
    }
}