import {Destination, DestinationType, RoomType} from "../../types/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import { TYPE_DRAGON, TYPE_VOL, TYPE_COMBAT } from "../types";
import { DRESSEUR_COLLINE_ROYALE} from "../trainers";
import {MINIDRACO} from "../pokemons/minidraco";
import {REPTINCEL} from "../pokemons/reptincel";
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";
import { PokemonOnBoard } from "../../objects/pokemon";
import { Pokemon } from "../pokemons";
import { RONFLEX } from "../pokemons/ronflex";
import { NO_OWNER } from "../owners";
import { gameState } from "../../logic/gamestate";

export const COLLINE_ROYALE: Destination = {
    ref: "COLLINE_ROYALE",
    name: "Colline des Rois",
    nextDestinations: {
        ARGENTA: [[-2,0],[-2,0]],
        CELADOPOLE: [[-2,0],[0,2]]
    },
    coordinates: [11*16 -8, 5*16 -8],
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
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('ronflex_endormi', 'assets/maps/ronflex_endormi.json');
        scene.load.tilemapTiledJSON('colline_royale', 'assets/maps/colline_royale.json');
        preloadMusic("music_colline_royale", "assets/audio/music/03 To Bill's Origin - From Cerulean.mp3");
    }
}

export const RONFLEX_ENDORMI: Destination = {
    ref: "RONFLEX_ENDORMI",
    name: "Chemin vers la Colline",
    nextDestinations: {},
    coordinates: [11*16 -8, 5*16 -8],
    type: DestinationType.WILD,
    icons: ["type_NORMAL"],
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Chemin vers la Colline",
            map: "ronflex_endormi",
            music: "music_colline_royale",
            spawnOtherTeam(){
                return [
                    new PokemonOnBoard(new Pokemon(RONFLEX, NO_OWNER, 30), 3, 3)
                ]
            },
        }
    },
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('ronflex_endormi', 'assets/maps/ronflex_endormi.json');
    },
    onExit(){
        gameState.wokeUpRonflex = true
        gameState.currentDestination = COLLINE_ROYALE
    }
}