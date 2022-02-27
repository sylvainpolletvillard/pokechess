import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {DRESSEUR_ARGENTA, PIERRE} from "../trainers";
import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";

import { AMONISTAR } from "../pokemons/amonistar";
import { GRAVALANCH } from "../pokemons/gravalanch";
import { GROLEM } from "../pokemons/grolem";
import { KABUTOPS } from "../pokemons/kabutops";
import { ONIX } from "../pokemons/onix";
import { RACAILLOU } from "../pokemons/racaillou";
import { RHINOCORNE } from "../pokemons/rhinocorne";
import { RHINOFEROS } from "../pokemons/rhinoferos";
import {KANGOUREX} from "../pokemons/kangourex";
import {RONFLEX} from "../pokemons/ronflex";
import {KABUTO} from "../pokemons/kabuto";
import {KOKIYAS} from "../pokemons/kokiyas";
import {KRABBY} from "../pokemons/krabby";
import {MACHOC} from "../pokemons/machoc";
import {SHOP_JADIELLE} from "../levels/shops";

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
    rooms: {
        arena: {
            name: "Arène d'Argenta",
            type: RoomType.ARENA,
            trainer: PIERRE,
            map: "arene_argenta",
            music: "music_argenta",
            spawnOtherTeam(){
                return spawnChampionTeam([
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
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Arène d'Argenta",
            map: "arene_argenta",
            music: "music_argenta",
            trainer: DRESSEUR_ARGENTA,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    RACAILLOU,
                    ONIX,
                    RHINOCORNE,
                    KANGOUREX,
                    RONFLEX,
                    KABUTO,
                    KOKIYAS,
                    KRABBY,
                    MACHOC
                ])
            }
        },
        shop: {
            type: RoomType.FREEWALK,
            name: "Magasin d'Argenta",
            music: "music_shop",
            level: SHOP_JADIELLE
        }
    },
    shopId: 2
}