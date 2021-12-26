import { spawnChampionTeam } from "../../logic/spawns";
import {Destination, DestinationType, RoomType} from "../../model/destination";
import { MAJOR_BOB } from "../champions";
import { ELECTRODE } from "../pokemons/electrode";
import { ELEKTEK } from "../pokemons/elektek";
import { MAGNETI } from "../pokemons/magneti";
import { MAGNETON } from "../pokemons/magneton";
import { PIKACHU } from "../pokemons/pikachu";
import { RAICHU } from "../pokemons/raichu";
import { VOLTALI } from "../pokemons/voltali";
import { VOLTORBE } from "../pokemons/voltorbe";

export const CARMIN: Destination = {
    ref: "CARMIN",
    name: "Carmin sur mer",
    nextDestinations: {
        MAISON_PSY: [[0,-2.5]],
        CAVE_TAUPIQUEUR_EST: [[3,0],[0,-1]],
        OCEANE_CARMIN: [[-2,0]],
        FALAISES: [[3,0],[2,0]]
    },
    coordinates: [216,168],
    type: DestinationType.ARENA,
    icons: ["type_ELECTRIQUE"],
    subtext: "Arène",
    getRoomOrder(){ return ["arena"] },
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène de Carmin s.mer",
            map: "arene_carmin",
            spawnOtherTeam() {
                return spawnChampionTeam([
                        VOLTORBE,
                        PIKACHU,
                        RAICHU,
                        MAGNETI,
                        MAGNETON,
                        ELECTRODE,
                        ELEKTEK,
                        VOLTALI
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
            music: "music_carmin",
            champion: MAJOR_BOB
        }
    }
}