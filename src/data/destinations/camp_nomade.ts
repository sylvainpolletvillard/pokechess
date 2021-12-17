import {Destination, DestinationType, RoomType} from "../../model/destination";
import {spawnChampionTeam} from "../../logic/spawns";
import {SALAMECHE} from "../pokemons/salameche";
import {HECTOR, SALLY} from "../champions";
import {CHRYSACIER} from "../pokemons/chrysacier";
import {COCONFORT} from "../pokemons/coconfort";
import {MIMITOSS} from "../pokemons/mimitoss";
import {AEROMITE} from "../pokemons/aeromite";
import {DARDARGNAN} from "../pokemons/dardargnan";
import {PAPILUSION} from "../pokemons/papilusion";
import {PARASECT} from "../pokemons/parasect";

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
                return spawnChampionTeam([
                        /*INSECATEUR,
                        SCARABRUTE
                        */
                        CHRYSACIER,
                        COCONFORT,
                        MIMITOSS,
                        AEROMITE,
                        DARDARGNAN,
                        PAPILUSION,
                        PARASECT,
                        SALAMECHE,
                        SALAMECHE
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
            champion: HECTOR
        }
    }
}