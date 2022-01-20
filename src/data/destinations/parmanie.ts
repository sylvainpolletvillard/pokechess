import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {KOGA} from "../trainers";
import {spawnChampionTeam} from "../../logic/spawns";
import { AEROMITE } from "../pokemons/aeromite";
import { ARBOK } from "../pokemons/arbok";
import { RAFFLESIA } from "../pokemons/rafflesia";
import { SMOGO } from "../pokemons/smogo";
import { SMOGOGO } from "../pokemons/smogogo";
import { TADMORV } from "../pokemons/tadmorv";
import { TENTACRUEL } from "../pokemons/tentacruel";
import { GROTADMORV } from "../pokemons/grotadmorv";

export const PARMANIE: Destination = {
    ref: "PARMANIE",
    name: "Parmanie",
    nextDestinations: {
        PARC_SAFARI: [[0,-2]],
        PISTE_CYCLABLE: [[-4,0],[0,-4]],
        ILES_ECUME: [[0,3],[-3,0]],
        CHAMPS_VERDOYANTS: [[3,0],[0,-1],[1,0]]
    },
    coordinates: [200,248],
    type: DestinationType.ARENA,
    icons: ["type_POISON"],
    subtext: "Arène",
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène de Parmanie",
            map: "parmanie",
            spawnOtherTeam() {
                return spawnChampionTeam([
                        SMOGO,
                        SMOGOGO,
                        TADMORV,
                        GROTADMORV,
                        ARBOK,
                        AEROMITE,
                        TENTACRUEL,
                        RAFFLESIA
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
            music: "music_parmanie",
            trainer: KOGA
        }
    }
}