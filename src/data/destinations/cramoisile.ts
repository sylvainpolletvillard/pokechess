import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {AUGUSTE, DRESSEUR_CRAMOISILE} from "../trainers";
import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";
import { ARCANIN } from "../pokemons/arcanin";
import { CANINOS } from "../pokemons/caninos";
import { FEUNARD } from "../pokemons/feunard";
import { GALOPA } from "../pokemons/galopa";
import { GOUPIX } from "../pokemons/goupix";
import { MAGMAR } from "../pokemons/magmar";
import { PONYTA } from "../pokemons/ponyta";
import {DRACAUFEU} from "../pokemons/dracaufeu";
import {SMOGO} from "../pokemons/smogo";
import {SMOGOGO} from "../pokemons/smogogo";
import {TADMORV} from "../pokemons/tadmorv";
import {GROTADMORV} from "../pokemons/grotadmorv";
import {ARBOK} from "../pokemons/arbok";
import {AEROMITE} from "../pokemons/aeromite";
import {TENTACRUEL} from "../pokemons/tentacruel";
import {RAFFLESIA} from "../pokemons/rafflesia";
import {SHOP_JADIELLE} from "../levels/shops";
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";

export const CRAMOISILE: Destination = {
    ref: "CRAMOISILE",
    name: "Cramois'Île",
    coordinates: [88,294],
    type: DestinationType.ARENA,
    icons: ["type_FEU"],
    nextDestinations: {
        BOURG_PALETTE: [[0,-2.5],[0,-1.5],[-1,0]],
        MONT_BRAISE: [[0,-2.5], [-3, 0.5]],
        OCEANE_CRAMOISILE: [[-2,0]],
        ILES_ECUME: [[4,0]]
    },
    rooms: {
        arena: {
            name: "Arène de Cramois'Île",
            type: RoomType.ARENA,
            map: "cramoisile",
            music: "music_cramoisile",
            trainer: AUGUSTE,
            spawnOtherTeam(){
                return spawnChampionTeam([
                        CANINOS,
                        ARCANIN,
                        PONYTA,
                        GALOPA,
                        GOUPIX,
                        FEUNARD,
                        MAGMAR,
                        DRACAUFEU
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
            name: "Arène de Cramois'Île",
            type: RoomType.ARENA,
            map: "cramoisile",
            music: "music_cramoisile",
            trainer: DRESSEUR_CRAMOISILE,
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
            name: "Magasin de Cramois'Île",
            music: "music_shop",
            level: SHOP_JADIELLE
        }
    },
    shopId: 9,
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('cramoisile', 'assets/maps/cramoisile.json');
        preloadMusic("music_cramoisile", "assets/audio/music/10 Cinnabar Island's Theme.mp3");
    }
}