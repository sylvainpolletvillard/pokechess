import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnTrainerTeam} from "../../logic/spawns";
import {HECTOR} from "../trainers";
import {COCONFORT} from "../pokemons/coconfort";
import {MIMITOSS} from "../pokemons/mimitoss";
import {AEROMITE} from "../pokemons/aeromite";
import {DARDARGNAN} from "../pokemons/dardargnan";
import {PAPILUSION} from "../pokemons/papilusion";
import {PARASECT} from "../pokemons/parasect";
import { INSECATEUR } from "../pokemons/insecateur";
import { SCARABRUTE } from "../pokemons/scarabrute";

export const CAMP_NOMADE: Destination = {
    ref: "CAMP_NOMADE",
    name: "Camp nomade",
    nextDestinations: {
        CHAMPS_VERDOYANTS: [[-2,0],[0,1]],
        FALAISES: [[0,-3]]
    },
    coordinates: [296,214],
    type: DestinationType.ARENA,
    icons: ["type_INSECTE"],
    subtext: "Arène",
    getRoomOrder(){ return ["arena"] },
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène sauvage",
            map: "arene_camp_nomade",
            spawnOtherTeam() {
                return spawnTrainerTeam([
                        COCONFORT,
                        MIMITOSS,
                        AEROMITE,
                        DARDARGNAN,
                        PAPILUSION,
                        PARASECT,
                        INSECATEUR,
                        SCARABRUTE
                    ],
                    [
                        [2, 3],
                        [4, 3],
                        [3, 3],
                        [0, 2],
                        [1, 2],
                        [6, 2],
                        [5, 2],
                        [3, 0]
                    ])
            },
            music: "music_camp_nomade",
            trainer: HECTOR
        }
    }
}