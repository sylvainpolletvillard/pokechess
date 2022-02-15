import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import {TYPE_VOL, TYPE_GLACE, TYPE_ROCHE, TYPE_EAU, TYPE_NORMAL} from "../types";
import {DRESSEUR_COL_DE_MONTAGNE} from "../trainers";
import {PIAFABEC} from "../pokemons/piafabec";
import {ROUCOOL} from "../pokemons/roucool";
import {CANINOS} from "../pokemons/caninos";
import {NOSFERAPTI} from "../pokemons/nosferapti";
import {DODUO} from "../pokemons/doduo";
import {SALAMECHE} from "../pokemons/salameche";
import {MIMITOSS} from "../pokemons/mimitoss";
import {CANARTICHO} from "../pokemons/canarticho";

export const COL_DE_MONTAGNE: Destination = {
    ref: "COL_DE_MONTAGNE",
    name: "Col de Montagne",
    nextDestinations: {
        ARGENTA: [[0,1],[-1,0],[0,1]],
        MONT_SELENITE: [[2,0]],
        AZURIA: [[2,0],[4,0]]
    },
    coordinates: [122,40],
    type: DestinationType.WILD,
    icons: ["type_VOL"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Col de Montagne",
            music: "music_battle_wild",
            map: "col_de_montagne",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_VOL.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.2,
                    [TYPE_GLACE.ref]: 0.2,
                    [TYPE_ROCHE.ref]: 0.2,
                    [TYPE_EAU.ref]: 0.1,
                })
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Col de Montagne",
            map: "col_de_montagne",
            music: "music_battle_wild",
            trainer: DRESSEUR_COL_DE_MONTAGNE,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    ROUCOOL,
                    PIAFABEC,
                    CANINOS,
                    NOSFERAPTI,
                    DODUO,
                    SALAMECHE,
                    MIMITOSS,
                    CANARTICHO
                ])
            }
        }
    }
}