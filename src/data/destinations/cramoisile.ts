import {Destination, DestinationType, RoomType} from "../../model/destination";
import {DRACAUFEU} from "../pokemons/dracaufeu";
import {SALAMECHE} from "../pokemons/salameche";
import {REPTINCEL} from "../pokemons/reptincel";
import {AUGUSTE, SCIENTIFIQUE_TUTO} from "../champions";
import {spawnChampionTeam, spawnTutoCaptureTeam} from "../../logic/spawns";
import {gameState} from "../../logic/gamestate";

export const CRAMOISILE: Destination = {
    ref: "CRAMOISILE",
    name: "Cramois'Île",
    coordinates: [88,294],
    type: DestinationType.ARENA,
    icons: ["type_FEU"],
    subtext: "Arène",
    nextDestinations: {
        BOURG_PALETTE: [[0,-2.5],[0,-1.5],[-1,0]],
        MONT_BRAISE: [[0,-2.5], [-3, 0.5]],
        OCEANE_CRAMOISILE: [[-2,0]],
        ILES_ECUME: [[4,0]]
    },
    getRoomOrder(){
        if(gameState.day === 0) return ["tuto"]
        else return ["arena"]
    },
    rooms: {
        arena: {
            name: "Arène de Cramois'Île",
            type: RoomType.ARENA,
            map: "cramoisile",
            music: "music_cramoisile",
            champion: AUGUSTE,
            spawnOtherTeam(){
                return spawnChampionTeam([
                        /*CANINOS,
                        CANINOS,
                        ARCANIN,
                        PONYTA,
                        GALOPA,
                        GOUPIX,
                        FEUNARD,
                        MAGMAR*/
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
            }
        },
        tuto:  {
            name: "Arène de Cramois'Île",
            type: RoomType.TUTORIAL,
            map: "cramoisile",
            music: "music_cramoisile",
            champion: SCIENTIFIQUE_TUTO,
            spawnOtherTeam(){
                return spawnTutoCaptureTeam()
            }
        },
    },
}