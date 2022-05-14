import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import { TYPE_DRAGON, TYPE_VOL, TYPE_COMBAT } from "../types";
import { DRESSEUR_COLLINE_ROYALE} from "../trainers";
import {MINIDRACO} from "../pokemons/minidraco";
import {REPTINCEL} from "../pokemons/reptincel";
import { preloadMusic } from "../../logic/audio";

export const COLLINE_ROYALE: Destination = {
    ref: "COLLINE_ROYALE",
    name: "Colline des Rois",
    nextDestinations: {
        ARGENTA: [[-2,0],[-2,0]],
        CELADOPOLE: [[-2,0],[0,2]]
    },
    coordinates: [168,72],
    type: DestinationType.WILD,
    icons: ["type_DRAGON"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Colline des Rois",
            map: "colline_royale",
            music: "music_colline_royale",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_DRAGON.ref]: 1,
                    [TYPE_VOL.ref]: 0.5,
                    [TYPE_COMBAT.ref]: 0.2,
                })
            },
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Colline des Rois",
            map: "colline_royale",
            music: "music_colline_royale",
            trainer: DRESSEUR_COLLINE_ROYALE,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    MINIDRACO,
                    MINIDRACO,
                    REPTINCEL
                ])
            }
        }
    },
    preload(){
        preloadMusic("music_colline_royale", "assets/audio/music/03 To Bill's Origin ~ From Cerulean.mp3");
    }
}