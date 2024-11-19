import {Destination, DestinationType, RoomType} from "../../types/destination";
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
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";
import { t } from "../../i18n";

export const CHAMPS_VERDOYANTS: Destination = {
    ref: "CHAMPS_VERDOYANTS",
    name: t("destination.CHAMPS_VERDOYANTS"),
    nextDestinations: {
        CAMP_NOMADE: [[0,-1],[2,0]],
        PARMANIE: [[-1,0],[0,1],[-3,0]]
    },
    coordinates: [17*16 -8, 15*16 -8],
    type: DestinationType.WILD,
    icons: ["type_PLANTE"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: t("destination.CHAMPS_VERDOYANTS"),
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
            name: t("destination.CHAMPS_VERDOYANTS"),
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
    },
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('champs_verdoyants', 'assets/maps/champs_verdoyants.json');
        preloadMusic("music_champs_verdoyants", "assets/audio/music/19 The Road to Viridian City from Pallet.mp3");
    }
}