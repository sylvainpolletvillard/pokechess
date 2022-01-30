import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import { TYPE_ROCHE, TYPE_EAU, TYPE_VOL, TYPE_SOL } from "../types";
import {RACAILLOU} from "../pokemons/racaillou";
import {ONIX} from "../pokemons/onix";
import {CANINOS} from "../pokemons/caninos";
import {RHINOCORNE} from "../pokemons/rhinocorne";
import {PIAFABEC} from "../pokemons/piafabec";
import {SALAMECHE} from "../pokemons/salameche";
import {SAQUEDENEU} from "../pokemons/saquedeneu";
import {SABELETTE} from "../pokemons/sabelette";
import {DRESSEUR_FALAISES} from "../trainers";

export const FALAISES: Destination = {
    ref: "FALAISES",
    name: "Falaises",
    nextDestinations: {
        LAVANVILLE: [[0,-4]],
        CARMIN: [[-2,0],[-3,0]],
        CAMP_NOMADE: [[0,3]],
        CAVE_TAUPIQUEUR_EST: [[-2,0],[0,-1]]
    },
    coordinates: [296,168],
    type: DestinationType.WILD,
    icons: ["type_ROCHE"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Falaises",
            map: "falaises",
            music: "music_falaises",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_ROCHE.ref]: 1,
                    [TYPE_EAU.ref]: 1,
                    [TYPE_VOL.ref]: 1,
                    [TYPE_SOL.ref]: 0.5
                })
            },
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Falaises",
            map: "falaises",
            music: "music_falaises",
            trainer: DRESSEUR_FALAISES,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    RACAILLOU,
                    ONIX,
                    CANINOS,
                    RHINOCORNE,
                    SALAMECHE,
                    PIAFABEC,
                    SAQUEDENEU,
                    SABELETTE
                ])
            }
        }
    }
}