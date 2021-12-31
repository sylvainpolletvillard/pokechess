import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {PIERRE} from "../trainers";
import {spawnTrainerTeam} from "../../logic/spawns";

import { AMONISTAR } from "../pokemons/amonistar";
import { GRAVALANCH } from "../pokemons/gravalanch";
import { GROLEM } from "../pokemons/grolem";
import { KABUTOPS } from "../pokemons/kabutops";
import { ONIX } from "../pokemons/onix";
import { RACAILLOU } from "../pokemons/racaillou";
import { RHINOCORNE } from "../pokemons/rhinocorne";
import { RHINOFEROS } from "../pokemons/rhinoferos";

export const ARGENTA: Destination = {
    ref: "ARGENTA",
    name: "Argenta",
    nextDestinations: {
        FORET_JADE: [[-2,0],[0, 4]],
        COL_DE_MONTAGNE: [[0,-1],[1,0],[0,-1]],
        COLLINE_ROYALE: [[2,0],[2,0]],
        CELADOPOLE: [[2,0],[0,2]]
    },
    coordinates: [104,72],
    type: DestinationType.ARENA,
    icons: ["type_ROCHE"],
    subtext: "Arène",
    getRoomOrder(){ return ["arena"] },
    rooms: {
        arena: {
            name: "Arène d'Argenta",
            type: RoomType.ARENA,
            trainer: PIERRE,
            map: "arene_argenta",
            spawnOtherTeam(){
                return spawnTrainerTeam([
                        RACAILLOU,
                        ONIX,
                        GRAVALANCH,
                        RHINOCORNE,
                        RHINOFEROS,
                        GROLEM,
                        AMONISTAR,
                        KABUTOPS
                    ],
                    [
                        [2,3],
                        [4,3],
                        [3,3],
                        [0,2],
                        [1,2],
                        [6,2],
                        [5,2],
                        [3,0]
                    ])
            },
            music: "music_argenta"
        }
    }
}