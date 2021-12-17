import {Destination, DestinationType, RoomType} from "../../model/destination";
import {KOGA} from "../champions";
import {spawnChampionTeam} from "../../logic/spawns";
import {SALAMECHE} from "../pokemons/salameche";
import {REPTINCEL} from "../pokemons/reptincel";
import {DRACAUFEU} from "../pokemons/dracaufeu";

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
    getRoomOrder(){ return ["arena"] },
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène de Parmanie",
            map: "parmanie",
            spawnOtherTeam() {
                return spawnChampionTeam([
                        /*SMOGO,
                        SMOGOGO,
                        TADMORV,
                        GRODATMORV,
                        ARBOK,
                        AEROMITE,
                        TENTACRUEL,
                        RAFFLESIA,
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
            champion: KOGA
        }
    }
}