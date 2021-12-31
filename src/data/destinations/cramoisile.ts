import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {AUGUSTE} from "../trainers";
import {spawnTrainerTeam} from "../../logic/spawns";
import { ARCANIN } from "../pokemons/arcanin";
import { CANINOS } from "../pokemons/caninos";
import { FEUNARD } from "../pokemons/feunard";
import { GALOPA } from "../pokemons/galopa";
import { GOUPIX } from "../pokemons/goupix";
import { MAGMAR } from "../pokemons/magmar";
import { PONYTA } from "../pokemons/ponyta";
import {DRACAUFEU} from "../pokemons/dracaufeu";

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
        return ["arena"]
    },
    rooms: {
        arena: {
            name: "Arène de Cramois'Île",
            type: RoomType.ARENA,
            map: "cramoisile",
            music: "music_cramoisile",
            trainer: AUGUSTE,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                        CANINOS,
                        ARCANIN,
                        PONYTA,
                        GALOPA,
                        GOUPIX,
                        FEUNARD,
                        MAGMAR,
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
        }
    },
}