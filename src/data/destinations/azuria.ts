import {Destination, DestinationType, RoomType} from "../../model/destination";
import {ONDINE} from "../champions";
import {spawnChampionTeam} from "../../logic/spawns";

import { AKWAKWAK } from "../pokemons/akwakwak";
import { AQUALI } from "../pokemons/aquali";
import { HYPOCEAN } from "../pokemons/hypocean";
import { LEVIATOR } from "../pokemons/leviator";
import { LOKHLASS } from "../pokemons/lokhlass";
import { STARI } from "../pokemons/stari";
import { STAROSS } from "../pokemons/staross";
import { PSYKOKWAK } from "../pokemons/psykokwak";

export const AZURIA: Destination = {
    ref: "AZURIA",
    name: "Azuria",
    nextDestinations: {
        GROTTE_AZUREE: [[0,-2]],
        COL_DE_MONTAGNE: [[-4,0],[-2,0]],
        MONT_SELENITE: [[-4,0],[0,-1]],
        OCEANE_AZURIA: [[2,0],[0,-1],[1,0],[0,-1]],
        CENTRALE: [[2,0],[0,1],[1,0],[0,1]],
        PENSION: [[0,2]]
    },
    coordinates: [216,38],
    type: DestinationType.ARENA,
    icons: ["type_EAU"],
    subtext: "Arène",
    getRoomOrder(){ return ["arena"] },
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène d'Azuria",
            map: "arene_azuria",
            spawnOtherTeam(){
                return spawnChampionTeam([
                        STARI,
                        STAROSS,
                        PSYKOKWAK,
                        AKWAKWAK,
                        AQUALI,
                        LOKHLASS,
                        LEVIATOR,
                        HYPOCEAN
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
            music: "music_azuria",
            champion: ONDINE
        }
    }
}