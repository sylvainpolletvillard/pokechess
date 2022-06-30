import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";
import {Destination, DestinationType, RoomType} from "../../types/destination";
import {DRESSEUR_CELADOPOLE, ERIKA} from "../trainers";
import { BOUSTIFLOR } from "../pokemons/boustiflor";
import { EMPIFLOR } from "../pokemons/empiflor";
import { FLORIZARRE } from "../pokemons/florizarre";
import { HERBIZARRE } from "../pokemons/herbizarre";
import { NOADKOKO } from "../pokemons/noadkoko";
import { ORTIDE } from "../pokemons/ortide";
import { RAFFLESIA } from "../pokemons/rafflesia";
import { SAQUEDENEU } from "../pokemons/saquedeneu";
import {MYSTHERBE} from "../pokemons/mystherbe";
import {BULBIZARRE} from "../pokemons/bulbizarre";
import {CHETIFLOR} from "../pokemons/chetiflor";
import {NOEUFNOEUF} from "../pokemons/noeufnoeuf";
import {PARAS} from "../pokemons/paras";
import {PAPILUSION} from "../pokemons/papilusion";
import {TAUPIQUEUR} from "../pokemons/taupiqueur";
import {SHOP_CELADOPOLE} from "../levels/shops";
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";
import { BADGE_PRISME } from "../badges";

export const CELADOPOLE: Destination = {
    ref: "CELADOPOLE",
    name: "Céladopole",
    nextDestinations: {
        ARGENTA: [[0,-2],[-2,0]],
        COLLINE_ROYALE: [[0,-2],[2,0]],
        DOJO: [[3,0]],
        PISTE_CYCLABLE: [[0,5]]
    },
    coordinates: [9*16 -8, 7*16 -8],
    type: DestinationType.ARENA,
    icons: ["badge_prisme", "type_PLANTE"],
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène de Céladopole",
            map: "arene_celadopole",
            music: "music_celadopole",
            trainer: ERIKA,
            badge: BADGE_PRISME,
            spawnOtherTeam() {
                return spawnChampionTeam([
                        SAQUEDENEU,
                        ORTIDE,
                        BOUSTIFLOR,
                        HERBIZARRE,
                        NOADKOKO,
                        RAFFLESIA,
                        EMPIFLOR,
                        FLORIZARRE
                    ],
                    [
                        [2, 3],
                        [1, 0],
                        [3, 3],
                        [4, 3],
                        [1, 3],
                        [6, 0],
                        [6, 3],
                        [5, 3]
                    ])
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Arène de Céladopole",
            map: "arene_celadopole",
            music: "music_celadopole",
            trainer: DRESSEUR_CELADOPOLE,
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
        },
        shop: {
            type: RoomType.FREEWALK,
            name: "Magasin de Céladopole",
            music: "music_shop",
            level: SHOP_CELADOPOLE
        }
    },
    shopId: 6,
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('arene_celadopole', 'assets/maps/arene_celadopole.json');
        scene.load.tilemapTiledJSON('shop_celadopole', 'assets/maps/shop_celadopole.json');
        preloadMusic("music_celadopole", "assets/audio/music/09 Celadon City's Theme.mp3");        
    }
}