import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnTrainerTeam, spawnTeamByTypeFactor} from "../../logic/spawns";
import {TYPE_FEE, TYPE_INSECTE, TYPE_PLANTE, TYPE_POISON} from "../types";
import {RATTATA} from "../pokemons/rattata";
import {BULBIZARRE} from "../pokemons/bulbizarre";
import {MYSTHERBE} from "../pokemons/mystherbe";
import {SCARABRUTE} from "../pokemons/scarabrute";
import {MIMITOSS} from "../pokemons/mimitoss";
import {PARAS} from "../pokemons/paras";
import {SAQUEDENEU} from "../pokemons/saquedeneu";
import {CHENIPAN} from "../pokemons/chenipan";
import {INSECATEUR} from "../pokemons/insecateur";
import {ASPICOT} from "../pokemons/aspicot";
import {DRESSEUR_FORET_JADE} from "../trainers";
import { preloadMusic } from "../../logic/audio";

export const FORET_JADE: Destination = {
    ref: "FORET_JADE",
    name: "Forêt de Jade",
    nextDestinations: {
        JADIELLE: [[0,3]],
        ARGENTA: [[0,-4],[2,0]]
    },
    coordinates: [72,136],
    type: DestinationType.WILD,
    icons: ["type_INSECTE"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Forêt de Jade",
            map: "foret_de_jade",
            music: "music_foret_jade",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_INSECTE.ref]: 1,
                    [TYPE_PLANTE.ref]: 0.2,
                    [TYPE_POISON.ref]: 0.2,
                    [TYPE_FEE.ref]: 0.05,
                })
            },
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Forêt de Jade",
            map: "foret_de_jade",
            music: "music_foret_jade",
            trainer: DRESSEUR_FORET_JADE,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    CHENIPAN,
                    SCARABRUTE,
                    PARAS,
                    ASPICOT,
                    MIMITOSS,
                    INSECATEUR,
                    SAQUEDENEU,
                    MYSTHERBE,
                    BULBIZARRE,
                    RATTATA
                ])
            }
        }
    },
    preload(){
        preloadMusic("music_foret_jade", "assets/audio/music/38 Viridian Forest.mp3");
    }
}