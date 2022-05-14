import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";
import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {DRESSEUR_CARMIN, MAJOR_BOB} from "../trainers";
import { ELECTRODE } from "../pokemons/electrode";
import { ELEKTEK } from "../pokemons/elektek";
import { MAGNETI } from "../pokemons/magneti";
import { MAGNETON } from "../pokemons/magneton";
import { PIKACHU } from "../pokemons/pikachu";
import { RAICHU } from "../pokemons/raichu";
import { VOLTALI } from "../pokemons/voltali";
import { VOLTORBE } from "../pokemons/voltorbe";
import {SMOGO} from "../pokemons/smogo";
import {FANTOMINUS} from "../pokemons/fantominus";
import {MAGMAR} from "../pokemons/magmar";
import {STARI} from "../pokemons/stari";
import {SHOP_JADIELLE} from "../levels/shops";
import { preloadMusic } from "../../logic/audio";

export const CARMIN: Destination = {
    ref: "CARMIN",
    name: "Carmin sur mer",
    nextDestinations: {
        MAISON_PSY: [[0,-2.5]],
        CAVE_TAUPIQUEUR_EST: [[3,0],[0,-1]],
        OCEANE_CARMIN: [[-2,0]],
        FALAISES: [[3,0],[2,0]]
    },
    coordinates: [216,168],
    type: DestinationType.ARENA,
    icons: ["type_ELECTRIQUE"],
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène de Carmin s.mer",
            map: "arene_carmin",
            music: "music_carmin",
            trainer: MAJOR_BOB,
            spawnOtherTeam() {
                return spawnChampionTeam([
                        VOLTORBE,
                        PIKACHU,
                        RAICHU,
                        MAGNETI,
                        MAGNETON,
                        ELECTRODE,
                        ELEKTEK,
                        VOLTALI
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
            },

        },
        trainer: {
            type: RoomType.ARENA,
            name: "Arène de Carmin s.mer",
            map: "arene_carmin",
            music: "music_carmin",
            trainer: DRESSEUR_CARMIN,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    VOLTORBE,
                    VOLTORBE,
                    ELEKTEK,
                    PIKACHU,
                    SMOGO,
                    MAGNETI,
                    FANTOMINUS,
                    MAGMAR,
                    STARI
                ])
            }
        },
        shop: {
            type: RoomType.FREEWALK,
            name: "Magasin de Carmin sur Mer",
            music: "music_shop",
            level: SHOP_JADIELLE
        }
    },
    shopId: 7,
    preload(){
        preloadMusic("music_carmin", "assets/audio/music/11 Vermilion City's Theme.mp3");
    }
}