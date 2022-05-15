import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";
import {Destination, DestinationType, RoomType} from "../../logic/destination";
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
import {SHOP_JADIELLE} from "../levels/shops";
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";

export const CELADOPOLE: Destination = {
    ref: "CELADOPOLE",
    name: "Céladopole",
    nextDestinations: {
        ARGENTA: [[0,-2],[-2,0]],
        COLLINE_ROYALE: [[0,-2],[2,0]],
        DOJO: [[3,0]],
        PISTE_CYCLABLE: [[0,5]]
    },
    coordinates: [136,104],
    type: DestinationType.ARENA,
    icons: ["type_PLANTE"],
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène de Céladopole",
            map: "arene_celadopole",
            music: "music_celadopole",
            trainer: ERIKA,
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
                        [4, 3],
                        [3, 3],
                        [0, 2],
                        [1, 2],
                        [6, 2],
                        [5, 2],
                        [3, 0]
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
            level: SHOP_JADIELLE
        }
    },
    shopId: 6,
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('arene_celadopole', 'assets/maps/arene_celadopole.json');
        preloadMusic("music_celadopole", "assets/audio/music/09 Celadon City's Theme.mp3");        
    }
}