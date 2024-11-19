import {Destination, DestinationType, RoomType} from "../../types/destination";
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
import { MyScene } from "../../scenes/MyScene";
import { t } from "../../i18n";

export const FORET_JADE: Destination = {
    ref: "FORET_JADE",
    name: t("destination.FORET_JADE"),
    nextDestinations: {
        JADIELLE: [[0,3]],
        ARGENTA: [[0,-4],[2,0]]
    },
    coordinates: [5*16 -8, 9*16 -8],
    type: DestinationType.WILD,
    icons: ["type_INSECTE"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: t("destination.FORET_JADE"),
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
            name: t("destination.FORET_JADE"),
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
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('foret_de_jade', 'assets/maps/foret_de_jade.json');
        preloadMusic("music_foret_jade", "assets/audio/music/38 Viridian Forest.mp3");
    }
}