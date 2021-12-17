import {Destination, DestinationType, RoomArena, RoomType} from "../../model/destination";
import {GIOVANNI, SBIRE_ROCKET} from "../champions";
import {spawnChampionTeam} from "../../logic/spawns";
import {SALAMECHE} from "../pokemons/salameche";
import {REPTINCEL} from "../pokemons/reptincel";
import {DRACAUFEU} from "../pokemons/dracaufeu";
import {gameState} from "../../logic/gamestate";
import {shopJadielleLevel} from "../levels/shop_jadielle";

const ARENA_GIOVANNI: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_jadielle",
    music: "music_jadielle",
    name: "Arène de Jadielle",
    champion: GIOVANNI,
    spawnOtherTeam(){
        return spawnChampionTeam([
                /*RHINOCORNE,
                TRIOPIKEUR,
                NIDOQUEEN,
                NIDOKING,
                RHINOFEROS,
                OSSATUEUR,
                ONIX,
                GROLEM*/
                SALAMECHE,
                SALAMECHE,
                SALAMECHE,
                SALAMECHE,
                SALAMECHE,
                SALAMECHE,
                REPTINCEL,
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
}

export const TUTO_SBIRE: RoomArena = {
    type: RoomType.ARENA,
    map: "arene_jadielle",
    music: "music_jadielle",
    name: "Arène de Jadielle",
    champion: SBIRE_ROCKET,
    spawnOtherTeam(){
        return spawnChampionTeam([
            SALAMECHE
            //MIAOUSS
            ],
            [
                [3,3]
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
    getRoomOrder(){
        if(gameState.day <= 8) return ["shop","sbire"]
        else return ["shop","giovanni"]
    },
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
