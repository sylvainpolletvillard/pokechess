import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";
import {DRESSEUR_CAMP_NOMADE, DRESSEUR_FORET_JADE, HECTOR} from "../trainers";
import {COCONFORT} from "../pokemons/coconfort";
import {MIMITOSS} from "../pokemons/mimitoss";
import {AEROMITE} from "../pokemons/aeromite";
import {DARDARGNAN} from "../pokemons/dardargnan";
import {PAPILUSION} from "../pokemons/papilusion";
import {PARASECT} from "../pokemons/parasect";
import { INSECATEUR } from "../pokemons/insecateur";
import { SCARABRUTE } from "../pokemons/scarabrute";
import {CHENIPAN} from "../pokemons/chenipan";
import {PARAS} from "../pokemons/paras";
import {ASPICOT} from "../pokemons/aspicot";
import {SAQUEDENEU} from "../pokemons/saquedeneu";
import {MYSTHERBE} from "../pokemons/mystherbe";
import {BULBIZARRE} from "../pokemons/bulbizarre";
import {RATTATA} from "../pokemons/rattata";
import {BOUSTIFLOR} from "../pokemons/boustiflor";
import {NOADKOKO} from "../pokemons/noadkoko";
import {ABO} from "../pokemons/abo";
import {PIKACHU} from "../pokemons/pikachu";

export const CAMP_NOMADE: Destination = {
    ref: "CAMP_NOMADE",
    name: "Camp nomade",
    nextDestinations: {
        CHAMPS_VERDOYANTS: [[-2,0],[0,1]],
        FALAISES: [[0,-3]]
    },
    coordinates: [296,214],
    type: DestinationType.ARENA,
    icons: ["type_INSECTE"],
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène sauvage",
            map: "arene_camp_nomade",
            music: "music_camp_nomade",
            trainer: HECTOR,
            spawnOtherTeam() {
                return spawnChampionTeam([
                        COCONFORT,
                        MIMITOSS,
                        AEROMITE,
                        DARDARGNAN,
                        PAPILUSION,
                        PARASECT,
                        INSECATEUR,
                        SCARABRUTE
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
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Arène sauvage",
            map: "arene_camp_nomade",
            music: "music_foret_jade",
            trainer: DRESSEUR_CAMP_NOMADE,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    CHENIPAN,
                    SCARABRUTE,
                    PARAS,
                    ASPICOT,
                    MIMITOSS,
                    INSECATEUR,
                    BOUSTIFLOR,
                    NOADKOKO,
                    ABO,
                    PIKACHU
                ])
            }
        }
    }
}