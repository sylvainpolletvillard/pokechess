import {Destination, DestinationType, RoomType} from "../../model/destination";
import {spawnChampionTeam} from "../../logic/spawns";
import {SALAMECHE} from "../pokemons/salameche";
import {REPTINCEL} from "../pokemons/reptincel";
import {DRACAUFEU} from "../pokemons/dracaufeu";
import {ONDINE, SALLY} from "../champions";

export const LAVANVILLE: Destination = {
    ref: "LAVANVILLE",
    name: "Lavanville",
    nextDestinations: {
        CENTRALE: [[0,-1],[-1,0],[0,-1],[-1,0]],
        TOUR_POKEMON: [[-3,0]],
        FALAISES: [[0,4]]
    },
    coordinates: [296,104],
    type: DestinationType.ARENA,
    icons: ["type_FEE"],
    subtext: "Arène",
    getRoomOrder(){ return ["arena"] },
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène de Lavanville",
            map: "arene_lavanville",
            spawnOtherTeam() {
                return spawnChampionTeam([
                        /*MELOFEE,
                        MELODELFE,
                        RONDOUDOU,
                        GRODOUDOU,
                        MRMIME,
                        LEVEINARD,
                        PAPILLUSION,
                        MEW,
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
            music: "music_lavanville",
            champion: SALLY
        }
    }
}