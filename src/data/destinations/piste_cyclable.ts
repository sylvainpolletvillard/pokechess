import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import {TYPE_ELECTRIQUE, TYPE_NORMAL, TYPE_POISON} from "../types";
import {DRESSEUR_COL_DE_MONTAGNE, DRESSEUR_PISTE_CYCLABLE} from "../trainers";
import {ROUCOOL} from "../pokemons/roucool";
import {PIAFABEC} from "../pokemons/piafabec";
import {CANINOS} from "../pokemons/caninos";
import {NOSFERAPTI} from "../pokemons/nosferapti";
import {DODUO} from "../pokemons/doduo";
import {SALAMECHE} from "../pokemons/salameche";
import {MIMITOSS} from "../pokemons/mimitoss";
import {CANARTICHO} from "../pokemons/canarticho";
import {SMOGO} from "../pokemons/smogo";
import {ABO} from "../pokemons/abo";
import {MIAOUSS} from "../pokemons/miaouss";
import {TADMORV} from "../pokemons/tadmorv";
import {NIDORAN_MALE} from "../pokemons/nidoranm";
import {FANTOMINUS} from "../pokemons/fantominus";
import {SCARABRUTE} from "../pokemons/scarabrute";
import {ELEKTEK} from "../pokemons/elektek";
import {VOLTORBE} from "../pokemons/voltorbe";

export const PISTE_CYCLABLE: Destination = {
    ref: "PISTE_CYCLABLE",
    name: "Piste Cyclable",
    nextDestinations: {
        CELADOPOLE: [[0,-5]],
        PARMANIE: [[0,4],[4,0]]
    },
    coordinates: [136,184],
    type: DestinationType.WILD,
    icons: ["type_POISON"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Piste cyclable",
            map: "piste_cyclable",
            music: "music_piste_cyclable",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_POISON.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.4,
                    [TYPE_ELECTRIQUE.ref]: 0.4
                })
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Piste cyclable",
            map: "piste_cyclable",
            music: "music_piste_cyclable",
            trainer: DRESSEUR_PISTE_CYCLABLE,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    SMOGO,
                    ABO,
                    MIAOUSS,
                    TADMORV,
                    NIDORAN_MALE,
                    FANTOMINUS,
                    SCARABRUTE,
                    ELEKTEK,
                    VOLTORBE
                ])
            }
        }
    }
}