import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import { TYPE_COMBAT, TYPE_NORMAL, TYPE_INSECTE, TYPE_FEU, TYPE_PSY } from "../types";
import { DRESSEUR_DOJO} from "../trainers";
import {TYGNON} from "../pokemons/tygnon";
import {KICKLEE} from "../pokemons/kicklee";
import {KANGOUREX} from "../pokemons/kangourex";
import {MACHOPEUR} from "../pokemons/machopeur";
import {FEROSINGE} from "../pokemons/ferosinge";
import {TARTARD} from "../pokemons/tartard";
import { preloadMusic } from "../../logic/audio";

export const DOJO: Destination = {
    ref: "DOJO",
    name: "DOJO",
    nextDestinations: {
        SAFRANIA: [[2,0]],
        CELADOPOLE: [[-3,0]]
    },
    coordinates: [184,104],
    type: DestinationType.WILD,
    icons: ["type_COMBAT"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Dojo",
            map: "dojo",
            music: "music_dojo",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_COMBAT.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.2,
                    [TYPE_INSECTE.ref]: 0.2,
                    [TYPE_FEU.ref]: 0.2,
                    [TYPE_PSY.ref]: 0.2,
                })
            },
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Dojo",
            map: "dojo",
            music: "music_dojo",
            trainer: DRESSEUR_DOJO,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    TYGNON,
                    TYGNON,
                    KICKLEE,
                    KICKLEE,
                    KANGOUREX,
                    MACHOPEUR,
                    FEROSINGE,
                    TARTARD
                ])
            }
        }
    },
    preload(){
        preloadMusic("music_dojo", "assets/audio/music/15 Rival Appears.mp3");
    }
}