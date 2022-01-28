import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import { TYPE_PLANTE, TYPE_NORMAL, TYPE_INSECTE, TYPE_POISON, TYPE_SOL } from "../types";
import {DRESSEUR_CHAMPS_VERDOYANTS, DRESSEUR_MR_PSY} from "../trainers";
import {ABRA} from "../pokemons/abra";
import {SOPORIFIK} from "../pokemons/soporifik";
import {MR_MIME} from "../pokemons/mrmime";
import {PSYKOKWAK} from "../pokemons/psykokwak";
import {LEVEINARD} from "../pokemons/leveinard";
import {LIPPOUTOU} from "../pokemons/lippoutou";
import {RAMOLOSS} from "../pokemons/ramoloss";
import {PORYGON} from "../pokemons/porygon";
import {EVOLI} from "../pokemons/evoli";
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
            music: "music_champs_verdoyants",
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
            music: "music_champs_verdoyants",
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