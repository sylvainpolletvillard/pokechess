import {Destination, DestinationType, RoomType} from "../../model/destination";
import {PIERRE} from "../champions";
import {spawnChampionTeam} from "../../logic/spawns";
import {SALAMECHE} from "../pokemons/salameche";
import {REPTINCEL} from "../pokemons/reptincel";
import {DRACAUFEU} from "../pokemons/dracaufeu";

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
            champion: PIERRE,
            map: "arene_argenta",
            spawnOtherTeam(){
                return spawnChampionTeam([
                        /*RACAILLOU,
                        ONIX,
                        GRAVALANCH,
                        RHINOCORNE,
                        RHINOFEROS,
                        GROLEM,
                        AMONISTAR,
                        KABUTOPS,
                        */
                        SALAMECHE,
                        SALAMECHE,
                        SALAMECHE,
                        SALAMECHE,
                        SALAMECHE,
                        SALAMECHE,
                        REPTINCEL,
                        DRACAUFEU
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