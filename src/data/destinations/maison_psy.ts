import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import { TYPE_PSY, TYPE_NORMAL, TYPE_PLANTE, TYPE_FEU } from "../types";
import {DRESSEUR_MR_PSY} from "../trainers";
import {ABRA} from "../pokemons/abra";
import {SOPORIFIK} from "../pokemons/soporifik";
import {MR_MIME} from "../pokemons/mrmime";
import {PSYKOKWAK} from "../pokemons/psykokwak";
import {LEVEINARD} from "../pokemons/leveinard";
import {LIPPOUTOU} from "../pokemons/lippoutou";
import {RAMOLOSS} from "../pokemons/ramoloss";
import {PORYGON} from "../pokemons/porygon";
import {EVOLI} from "../pokemons/evoli";

export const MAISON_PSY: Destination = {
    ref: "MAISON_PSY",
    name: "Maison de Mr Psy",
    nextDestinations: {
        SAFRANIA: [[0,-1.5]],
        CARMIN: [[0,2.5]]
    },
    coordinates: [216,128],
    type: DestinationType.WILD,
    icons: ["type_PSY"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            music: "music_mr_psy",
            name: "Maison de Mr Psy",
            map: "maison_mr_psy",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_PSY.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.2,
                    [TYPE_PLANTE.ref]: 0.2,
                    [TYPE_FEU.ref]: 0.2,
                })
            }
        },
        trainer: {
            type: RoomType.ARENA,
            music: "music_mr_psy",
            name: "Maison de Mr Psy",
            map: "maison_mr_psy",
            trainer: DRESSEUR_MR_PSY,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    ABRA,
                    ABRA,
                    SOPORIFIK,
                    MR_MIME,
                    PSYKOKWAK,
                    LEVEINARD,
                    LIPPOUTOU,
                    RAMOLOSS,
                    PORYGON,
                    EVOLI
                ])
            }
        }
    }
}