import {Destination, DestinationType, RoomType} from "../../types/destination";
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
import { MyScene } from "../../scenes/MyScene";
import { preloadMusic } from "../../logic/audio";
import { t } from "../../i18n";

export const MAISON_PSY: Destination = {
    ref: "MAISON_PSY",
    name: t("destination.MAISON_PSY"),
    nextDestinations: {
        SAFRANIA: [[0,-1.5]],
        CARMIN: [[0,2.5]]
    },
    coordinates: [14*16 -8, 8.5*16 -8],
    type: DestinationType.WILD,
    icons: ["type_PSY"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            music: "music_mr_psy",
            name: t("destination.MAISON_PSY"),
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
            name: t("destination.MAISON_PSY"),
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
    },
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('maison_mr_psy', 'assets/maps/maison_mr_psy.json');
        preloadMusic("music_mr_psy", "assets/audio/music/16 Guide.mp3");
    }
}