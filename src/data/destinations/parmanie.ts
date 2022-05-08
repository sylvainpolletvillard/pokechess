import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {DRESSEUR_PARMANIE, KOGA} from "../trainers";
import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";
import { AEROMITE } from "../pokemons/aeromite";
import { ARBOK } from "../pokemons/arbok";
import { RAFFLESIA } from "../pokemons/rafflesia";
import { SMOGO } from "../pokemons/smogo";
import { SMOGOGO } from "../pokemons/smogogo";
import { TADMORV } from "../pokemons/tadmorv";
import { TENTACRUEL } from "../pokemons/tentacruel";
import { GROTADMORV } from "../pokemons/grotadmorv";
import {SHOP_JADIELLE} from "../levels/shops";

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
            map: "arene_parmanie",
            music: "music_parmanie",
            trainer: KOGA,
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
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Arène de Parmanie",
            map: "parmanie",
            music: "music_battle_wild",
            trainer: DRESSEUR_PARMANIE,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    SMOGO,
                    SMOGOGO,
                    TADMORV,
                    GROTADMORV,
                    ARBOK,
                    AEROMITE,
                    TENTACRUEL,
                    RAFFLESIA
                ])
            }
        },
        shop: {
            type: RoomType.FREEWALK,
            name: "Magasin de Parmanie",
            music: "music_shop",
            level: SHOP_JADIELLE
        }
    },
    shopId: 8
}