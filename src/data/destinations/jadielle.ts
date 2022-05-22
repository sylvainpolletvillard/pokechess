import {Destination, DestinationType, RoomArena, RoomType} from "../../types/destination";
import {GIOVANNI, SBIRE_ROCKET} from "../trainers";
import {spawnChampionTeam, spawnTrainerTeam} from "../../logic/spawns";
import {SHOP_JADIELLE} from "../levels/shops";
import { MIAOUSS } from "../pokemons/miaouss";
import { ABO } from "../pokemons/abo";
import { SMOGO } from "../pokemons/smogo";
import { GROLEM } from "../pokemons/grolem";
import { NIDOKING } from "../pokemons/nidoking";
import { NIDOQUEEN } from "../pokemons/nidoqueen";
import { ONIX } from "../pokemons/onix";
import { OSSATUEUR } from "../pokemons/ossatueur";
import { RHINOCORNE } from "../pokemons/rhinocorne";
import { RHINOFEROS } from "../pokemons/rhinoferos";
import { TRIOPIKEUR } from "../pokemons/triopikeur";
import {KOKIYAS} from "../pokemons/kokiyas";
import {EXCELANGUE} from "../pokemons/excelangue";
import {CHETIFLOR} from "../pokemons/chetiflor";
import {MAGICARPE} from "../pokemons/magicarpe";
import {OSSELAIT} from "../pokemons/osselait";
import {SABELETTE} from "../pokemons/sabelette";
import {RACAILLOU} from "../pokemons/racaillou";
import {BADGE_TERRE} from "../badges";
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";

const ARENA_GIOVANNI: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_jadielle",
    music: "music_jadielle",
    name: "Arène de Jadielle",
    trainer: GIOVANNI,
    badge: BADGE_TERRE,
    spawnOtherTeam(){
        return spawnChampionTeam([
                RHINOCORNE,
                TRIOPIKEUR,
                NIDOQUEEN,
                NIDOKING,
                RHINOFEROS,
                OSSATUEUR,
                ONIX,
                GROLEM
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
}

export const TUTO_SBIRE: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_jadielle",
    music: "music_jadielle",
    name: "Arène de Jadielle",
    trainer: SBIRE_ROCKET,
    spawnOtherTeam(){
        return spawnTrainerTeam([
            MIAOUSS,
            ABO,
            SMOGO,
            KOKIYAS,
            EXCELANGUE,
            CHETIFLOR,
            MAGICARPE,
            SABELETTE,
            OSSELAIT,
            RHINOCORNE,
            RACAILLOU
        ])
    }
}

export const JADIELLE: Destination = {
    ref: "JADIELLE",
    name: "Jadielle",
    nextDestinations: {
        BOURG_PALETTE: [[0,3]],
        FORET_JADE: [[0, -3]],
        CAVE_TAUPIQUEUR_OUEST: [[2,0],[0,-1.5]]
    },
    coordinates: [72,184],
    type: DestinationType.ARENA,
    icons: ["type_SOL"],
    rooms: {
        arena: ARENA_GIOVANNI,
        trainer: TUTO_SBIRE,
        shop: {
            type: RoomType.FREEWALK,
            name: "Magasin de Jadielle",
            music: "music_shop",
            level: SHOP_JADIELLE
        }
    },
    shopId: 1,
    preload(scene: MyScene){
        scene.load.tilemapTiledJSON('arene_jadielle', 'assets/maps/arene_jadielle.json');
        preloadMusic("music_jadielle", "assets/audio/music/06 Pokemon Gym.mp3");
    }
}
