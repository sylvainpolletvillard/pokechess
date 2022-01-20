import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnChampionTeam} from "../../logic/spawns";
import { SALLY} from "../trainers";
import { GRODOUDOU } from "../pokemons/grodoudou";
import { LEVEINARD } from "../pokemons/leveinard";
import { MELODELFE } from "../pokemons/melodelfe";
import { MELOFEE } from "../pokemons/melofee";
import { MEW } from "../pokemons/mew";
import { RONDOUDOU } from "../pokemons/rondoudou";
import { MR_MIME } from "../pokemons/mrmime";
import { PAPILUSION } from "../pokemons/papilusion";

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
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène de Lavanville",
            map: "arene_lavanville",
            spawnOtherTeam() {
                return spawnChampionTeam([
                        MELOFEE,
                        MELODELFE,
                        RONDOUDOU,
                        GRODOUDOU,
                        MR_MIME,
                        LEVEINARD,
                        PAPILUSION,
                        MEW
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
            trainer: SALLY
        }
    }
}