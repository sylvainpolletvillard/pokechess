import {Destination, DestinationType, RoomType} from "../../types/destination";
import {DRESSEUR_PARMANIE, KOGA} from "../trainers";
import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";
import { AEROMITE } from "../pokemons/aeromite";
import { ARBOK } from "../pokemons/arbok";
import { RAFFLESIA } from "../pokemons/rafflesia";
import { SMOGO } from "../pokemons/smogo";
import { SMOGOGO } from "../pokemons/smogogo";
import { TADMORV } from "../pokemons/tadmorv";
import { TENTACRUEL } from "../pokemons/tentacruel";
import { GROTADMORV } from "../pokemons/grotadmorv";
import { SHOP_PARMANIE } from "../levels/shops";
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";
import { BADGE_AME } from "../badges";

export const PARMANIE: Destination = {
    ref: "PARMANIE",
    name: "Parmanie",
    nextDestinations: {
        PARC_SAFARI: [[0,-2]],
        PISTE_CYCLABLE: [[-4,0],[0,-4]],
        ILES_ECUME: [[0,3],[-3,0]],
        CHAMPS_VERDOYANTS: [[3,0],[0,-1],[1,0]]
    },
    coordinates: [13*16 -8, 16*16 -8],
    type: DestinationType.ARENA,
    icons: ["type_POISON", "badge_ame"],
    subtext: "Arène",
    rooms: {
        arena: {
            type: RoomType.ARENA,
            name: "Arène de Parmanie",
            map: "arene_parmanie",
            music: "music_parmanie",
            trainer: KOGA,
            badge: BADGE_AME,
            spawnOtherTeam() {
                return spawnChampionTeam([
                        SMOGO,
                        SMOGOGO,
                        TADMORV,
                        GROTADMORV,
                        ARBOK,
                        AEROMITE,
                        TENTACRUEL,
                        RAFFLESIA
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
            name: "Arène de Parmanie",
            map: "arene_parmanie",
            music: "music_parmanie",
            trainer: DRESSEUR_PARMANIE,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    SMOGO,
                    SMOGOGO,
                    TADMORV,
                    GROTADMORV,
                    ARBOK,
                    AEROMITE,
                    TENTACRUEL,
                    RAFFLESIA
                ])
            }
        },
        shop: {
            type: RoomType.FREEWALK,
            name: "Magasin de Parmanie",
            music: "music_shop",
            level: SHOP_PARMANIE
        }
    },
    shopId: 8,
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('arene_parmanie', 'assets/maps/arene_parmanie.json');
        scene.load.tilemapTiledJSON('shop_parmanie', 'assets/maps/shop_parmanie.json');
        preloadMusic("music_parmanie", "assets/audio/music/40 Pokemon Mansion.mp3");
    }
}