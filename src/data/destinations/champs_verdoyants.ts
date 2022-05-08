import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import { TYPE_PLANTE, TYPE_NORMAL, TYPE_INSECTE, TYPE_POISON, TYPE_SOL } from "../types";
import {DRESSEUR_CHAMPS_VERDOYANTS} from "../trainers";
import {MYSTHERBE} from "../pokemons/mystherbe";
import {BULBIZARRE} from "../pokemons/bulbizarre";
import {CHETIFLOR} from "../pokemons/chetiflor";
import {NOEUFNOEUF} from "../pokemons/noeufnoeuf";
import {PARAS} from "../pokemons/paras";
import {PAPILUSION} from "../pokemons/papilusion";
import {SAQUEDENEU} from "../pokemons/saquedeneu";
import {TAUPIQUEUR} from "../pokemons/taupiqueur";

export const CHAMPS_VERDOYANTS: Destination = {
    ref: "CHAMPS_VERDOYANTS",
    name: "Champs verdoyants",
    nextDestinations: {
        CAMP_NOMADE: [[0,-1],[2,0]],
        PARMANIE: [[-1,0],[0,1],[-3,0]]
    },
    coordinates: [264,232],
    type: DestinationType.WILD,
    icons: ["type_PLANTE"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Champs verdoyants",
            map: "champs_verdoyants",
            music: "music_battle_wild",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_PLANTE.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.2,
                    [TYPE_INSECTE.ref]: 0.2,
                    [TYPE_POISON.ref]: 0.2,
                    [TYPE_SOL.ref]: 0.2,
                })
            },
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Champs verdoyants",
            map: "champs_verdoyants",
            music: "music_battle_trainer",
            trainer: DRESSEUR_CHAMPS_VERDOYANTS,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    MYSTHERBE,
                    MYSTHERBE,
                    BULBIZARRE,
                    CHETIFLOR,
                    NOEUFNOEUF,
                    PARAS,
                    PAPILUSION,
                    SAQUEDENEU,
                    TAUPIQUEUR
                ])
            }
        }
    }
}