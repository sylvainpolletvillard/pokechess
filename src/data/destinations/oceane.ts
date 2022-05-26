import {Destination, DestinationType, RoomArena, RoomType, RoomWild} from "../../types/destination";
import {spawnTeamByTypeFactor, spawnTrainerTeam} from "../../logic/spawns";
import {TYPE_COMBAT, TYPE_EAU, TYPE_NORMAL, TYPE_VOL} from "../types";
import {DRESSEUR_OCEANE} from "../trainers";
import {POISSIRENE} from "../pokemons/poissirene";
import {MACHOC} from "../pokemons/machoc";
import {STARI} from "../pokemons/stari";
import {HYPOTREMPE} from "../pokemons/hypotrempe";
import {LOKHLASS} from "../pokemons/lokhlass";
import {RAMOLOSS} from "../pokemons/ramoloss";
import {MAGICARPE} from "../pokemons/magicarpe";
import {KRABBY} from "../pokemons/krabby";
import {OTARIA} from "../pokemons/otaria";
import {KOKIYAS} from "../pokemons/kokiyas";
import {TADMORV} from "../pokemons/tadmorv";
import { preloadMusic } from "../../logic/audio";
import { MyScene } from "../../scenes/MyScene";

export const OCEANE_WILD: RoomWild = {
    type: RoomType.WILD,
    music: "music_oceane",
    name: "Sur l'Océane",
    map: "oceane",
    spawnOtherTeam(){
        return spawnTeamByTypeFactor({
            [TYPE_EAU.ref]: 1,
            [TYPE_VOL.ref]: 0.2,
            [TYPE_NORMAL.ref]: 0.1,
            [TYPE_COMBAT.ref]: 0.1,
        })
    }
}

function preload(scene: MyScene){
    scene.load.tilemapTiledJSON('oceane', 'assets/maps/oceane.json');
    preloadMusic("music_oceane", "assets/audio/music/13 St. Anne.mp3");
}

export const OCEANE_TRAINER: RoomArena = {
    type: RoomType.ARENA,
    music: "music_oceane",
    name: "Sur l'Océane",
    map: "oceane",
    trainer: DRESSEUR_OCEANE,
    spawnOtherTeam(){
        return spawnTrainerTeam([
            POISSIRENE,
            MACHOC,
            STARI,
            HYPOTREMPE,
            LOKHLASS,
            RAMOLOSS,
            MAGICARPE,
            KRABBY,
            OTARIA,
            KOKIYAS,
            TADMORV
        ])
    }
}

export const OCEANE_CARMIN: Destination = {
    ref: "OCEANE_CARMIN",
    name: "L'Océane",
    nextDestinations: {
        CARMIN: [[2,0]]
    },
    coordinates: [12*16 -8, 11*16 -8],
    type: DestinationType.SPECIAL,
    icons: ["boat"],
    subtext: "Voyage rapide vers Cramois'Île",
    rooms: {
        wild: OCEANE_WILD,
        trainer: OCEANE_TRAINER
    },
    preload
}

export const OCEANE_CRAMOISILE: Destination = {
    ref: "OCEANE_CRAMOISILE",
    name: "L'Océane",
    nextDestinations: {
        CRAMOISILE: [[2,0]],
    },
    coordinates: [4*16 -8, 19*16 -8],
    type: DestinationType.SPECIAL,
    icons: ["boat"],
    subtext: "Voyage rapide vers Azuria",
    rooms: {
        wild: OCEANE_WILD,
        trainer: OCEANE_TRAINER
    },
    preload
}

export const OCEANE_AZURIA: Destination = {
    ref: "OCEANE_AZURIA",
    name: "L'Océane",
    nextDestinations: {
        AZURIA: [[0,1],[-1,0],[0,1],[-2,0]],
        CENTRALE: [[0,1],[-1,0],[0,1],[0,1],[1,0],[0,1]]
    },
    coordinates: [17*16 -8, 8],
    type: DestinationType.SPECIAL,
    icons: ["boat"],
    subtext: "Voyage rapide vers Carmin",
    rooms: {
        wild: OCEANE_WILD,
        trainer: OCEANE_TRAINER
    },
    preload
}