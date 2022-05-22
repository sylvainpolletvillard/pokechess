import {Destination, DestinationType, RoomArena, RoomType, RoomWild} from "../../types/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import {TYPE_INSECTE, TYPE_ROCHE, TYPE_SOL, TYPE_SPECTRE} from "../types";
import {DRESSEUR_CAVE_TAUPIQUEUR} from "../trainers";
import {SMOGO} from "../pokemons/smogo";
import {FANTOMINUS} from "../pokemons/fantominus";
import {MAGMAR} from "../pokemons/magmar";
import {TAUPIQUEUR} from "../pokemons/taupiqueur";
import {TADMORV} from "../pokemons/tadmorv";
import {SABELETTE} from "../pokemons/sabelette";
import {RACAILLOU} from "../pokemons/racaillou";
import {MIAOUSS} from "../pokemons/miaouss";
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";

const ROOM_TAUPIQUEUR_WILD: RoomWild = {
    type: RoomType.WILD,
    name: "Cave taupiqueur",
    music: "music_cave",
    map: "cave_taupiqueur",
    spawnOtherTeam(){
        return spawnTeamByTypeFactor({
            [TYPE_SOL.ref]: 1,
            [TYPE_ROCHE.ref]: 0.2,
            [TYPE_INSECTE.ref]: 0.2,
            [TYPE_SPECTRE.ref]: 0.1
        })
    }
}

const ROOM_TAUPIQUEUR_TRAINER: RoomArena = {
    type: RoomType.ARENA,
    name: "Cave taupiqueur",
    music: "music_cave",
    map: "cave_taupiqueur",
    trainer: DRESSEUR_CAVE_TAUPIQUEUR,
    spawnOtherTeam(){
        return spawnTrainerTeam([
            TAUPIQUEUR,
            TAUPIQUEUR,
            TADMORV,
            MAGMAR,
            SABELETTE,
            FANTOMINUS,
            RACAILLOU,
            SMOGO,
            MIAOUSS
        ])
    }
}

function preload(scene: MyScene){    
    preloadMusic("music_cave", "assets/audio/music/39 Mt. Moon Cave.mp3");    
    scene.load.tilemapTiledJSON('cave_taupiqueur', 'assets/maps/cave_taupiqueur.json');
}

export const CAVE_TAUPIQUEUR_OUEST: Destination = {
    ref: "CAVE_TAUPIQUEUR_OUEST",
    name: "Cave Taupiqueur (Entrée Ouest)",
    subtext: "Voyage rapide",
    nextDestinations: {
        JADIELLE: [[0,1.5],[-2,0]],
    },
    coordinates: [104,156],
    type: DestinationType.SPECIAL,
    icons: ["cave_entrance", "type_SOL"],
    rooms: {
        wild: ROOM_TAUPIQUEUR_WILD,
        arena: ROOM_TAUPIQUEUR_TRAINER
    },
    preload
}

export const CAVE_TAUPIQUEUR_EST: Destination = {
    ref: "CAVE_TAUPIQUEUR_EST",
    name: "Cave Taupiqueur (Entrée Est)",
    subtext: "Voyage rapide",
    nextDestinations: {
        CARMIN: [[0,1],[-3,0]],
        FALAISES: [[0,1],[2,0]]
    },
    coordinates: [264,150],
    type: DestinationType.SPECIAL,
    icons: ["cave_entrance","type_SOL"],
    rooms: {
        wild: ROOM_TAUPIQUEUR_WILD,
        arena: ROOM_TAUPIQUEUR_TRAINER
    },
    preload
}