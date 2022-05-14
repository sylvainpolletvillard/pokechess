import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import {
    TYPE_COMBAT,
    TYPE_EAU,
    TYPE_ELECTRIQUE,
    TYPE_NORMAL,
} from "../types";
import {DRESSEUR_CENTRALE} from "../trainers";
import {MAGNETI} from "../pokemons/magneti";
import {ELEKTEK} from "../pokemons/elektek";
import {PIKACHU} from "../pokemons/pikachu";
import {VOLTALI} from "../pokemons/voltali";
import {VOLTORBE} from "../pokemons/voltorbe";
import {PORYGON} from "../pokemons/porygon";
import {MACHOC} from "../pokemons/machoc";
import {METAMORPH} from "../pokemons/metamorph";
import { preloadMusic } from "../../logic/audio";

export const CENTRALE: Destination = {
    ref: "CENTRALE",
    name: "Centrale",
    nextDestinations: {
        AZURIA: [[0,-1],[-1,0],[0,-1],[-2,0]],
        OCEANE_AZURIA: [[0,-1],[-1,0],[0,-1],[0,-1],[1,0],[0,-1]],
        LAVANVILLE: [[1,0],[0,1],[1,0],[0,1]]
    },
    coordinates: [264,70],
    type: DestinationType.WILD,
    icons: ["type_ELECTRIQUE"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Centrale électrique",
            music: "music_centrale",
            map: "centrale",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_ELECTRIQUE.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.5,
                    [TYPE_EAU.ref]: 0.5,
                    [TYPE_COMBAT.ref]: 0.2
                })
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Centrale électrique",
            music: "music_centrale",
            map: "centrale",
            trainer: DRESSEUR_CENTRALE,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    MAGNETI,
                    ELEKTEK,
                    PIKACHU,
                    VOLTALI,
                    VOLTORBE,
                    PORYGON,
                    MACHOC,
                    METAMORPH
                ])
            }
        }
    },
    preload(){
        preloadMusic("music_centrale", "assets/audio/music/37 Team Rocket Hideout.mp3");
    }
}