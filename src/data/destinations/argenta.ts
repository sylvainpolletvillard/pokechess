import {Destination, DestinationType, RoomType} from "../../types/destination";
import {DRESSEUR_ARGENTA, PIERRE} from "../trainers";
import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";
import {SHOP_ARGENTA} from "../levels/shops";
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";
import { AMONISTAR } from "../pokemons/amonistar";
import { GRAVALANCH } from "../pokemons/gravalanch";
import { GROLEM } from "../pokemons/grolem";
import { KABUTOPS } from "../pokemons/kabutops";
import { ONIX } from "../pokemons/onix";
import { RACAILLOU } from "../pokemons/racaillou";
import { RHINOCORNE } from "../pokemons/rhinocorne";
import { RHINOFEROS } from "../pokemons/rhinoferos";
import {KANGOUREX} from "../pokemons/kangourex";
import {RONFLEX} from "../pokemons/ronflex";
import {KABUTO} from "../pokemons/kabuto";
import {KOKIYAS} from "../pokemons/kokiyas";
import {KRABBY} from "../pokemons/krabby";
import {MACHOC} from "../pokemons/machoc";
import { BADGE_ROCHE } from "../badges";


export const ARGENTA: Destination = {
    ref: "ARGENTA",
    name: "Argenta",
    nextDestinations: {
        FORET_JADE: [[-2,0],[0, 4]],
        COL_DE_MONTAGNE: [[0,-1],[1,0],[0,-1]],
        COLLINE_ROYALE: [[2,0],[2,0]],
        CELADOPOLE: [[2,0],[0,2]]
    },
    coordinates: [7*16 -8, 5*16 -8],
    type: DestinationType.ARENA,
    icons: ["badge_roche", "type_ROCHE"],
    rooms: {
        arena: {
            name: "Arène d'Argenta",
            type: RoomType.ARENA,
            trainer: PIERRE,
            badge: BADGE_ROCHE,
            map: "arene_argenta",
            music: "music_argenta_safrania",
            spawnOtherTeam(){
                return spawnChampionTeam([
                        RACAILLOU,
                        ONIX,
                        GRAVALANCH,
                        RHINOCORNE,
                        RHINOFEROS,
                        GROLEM,
                        AMONISTAR,
                        KABUTOPS
                    ],
                    [
                        [2,3],
                        [4,3],
                        [3,3],
                        [0,2],
                        [1,2],
                        [6,2],
                        [5,2],
                        [3,0]
                    ])
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Arène d'Argenta",
            map: "arene_argenta",
            music: "music_argenta_safrania",
            trainer: DRESSEUR_ARGENTA,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    RACAILLOU,
                    ONIX,
                    RHINOCORNE,
                    KANGOUREX,
                    RONFLEX,
                    KABUTO,
                    KOKIYAS,
                    KRABBY,
                    MACHOC
                ])
            }
        },
        shop: {
            type: RoomType.FREEWALK,
            name: "Magasin d'Argenta",
            music: "music_shop",
            level: SHOP_ARGENTA
        }
    },
    shopId: 2,
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('shop_argenta', 'assets/maps/shop_argenta.json');
        scene.load.tilemapTiledJSON('arene_argenta', 'assets/maps/arene_argenta.json');
        preloadMusic("music_argenta_safrania", "assets/audio/music/07 Pewter City's Theme.mp3");
    }
}