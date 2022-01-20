import {Destination, DestinationType, RoomArena, RoomType} from "../../logic/destination";
import {GIOVANNI, SBIRE_ROCKET} from "../trainers";
import {spawnChampionTeam} from "../../logic/spawns";
import {shopJadielleLevel} from "../levels/shop_jadielle";
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

const ARENA_GIOVANNI: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_jadielle",
    music: "music_jadielle",
    name: "Arène de Jadielle",
    trainer: GIOVANNI,
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
        return spawnChampionTeam([
            MIAOUSS,
            ABO,
            SMOGO
            ],
            [
                [3,2],
                [4,3],
                [2,3]
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
    subtext: "Arène",
    rooms: {
        giovanni: ARENA_GIOVANNI,
        sbire: TUTO_SBIRE,
        shop: {
            type: RoomType.FREEWALK,
            name: "Magasin de Jadielle",
            music: "music_shop",
            level: shopJadielleLevel
        }
    },
    shopId: 1
}
