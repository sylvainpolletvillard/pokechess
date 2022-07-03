import { preloadMusic } from "../../logic/audio";
import { gameState } from "../../logic/gamestate";
import { spawnTeamByTypeFactor } from "../../logic/spawns";
import { Destination, DestinationType, RoomType, RoomWild } from "../../types/destination";
import { TYPE_COMBAT, TYPE_DRAGON, TYPE_EAU, TYPE_ELECTRIQUE, TYPE_FEE, TYPE_FEU, TYPE_GLACE, TYPE_PLANTE, TYPE_PSY, TYPE_ROCHE, TYPE_SOL, TYPE_SPECTRE } from "../types";

const ROUTE_VICTOIRE: RoomWild = {
    type: RoomType.WILD,
    name: "Route Victoire",
    music: "music_route_victoire",
    map: "route_victoire",
    spawnOtherTeam(){
        return spawnTeamByTypeFactor({
            [TYPE_SOL.ref]: 1,
            [TYPE_ROCHE.ref]: 1,
            [TYPE_PSY.ref]: 1,
            [TYPE_COMBAT.ref]: 1,
            [TYPE_FEU.ref]: 0.5,
            [TYPE_EAU.ref]: 0.5,
            [TYPE_PLANTE.ref]: 0.5,
            [TYPE_ELECTRIQUE.ref]: 0.5,
            [TYPE_DRAGON.ref]: 0.5,
            [TYPE_SPECTRE.ref]: 0.25,
            [TYPE_GLACE.ref]: 0.25,
            [TYPE_FEE.ref]: 0.25,
            [TYPE_ELECTRIQUE.ref]: 0.25,
        })
    }
}

export const ROUTE_VICTOIRE_ENTREE: Destination = {
    ref: "ROUTE_VICTOIRE_ENTREE",
    name: "Route Victoire (Entrée)",
    subtext: "Voyage rapide",
    nextDestinations: {
        JADIELLE: [[0,7],[3,0]],
    },
    coordinates: [2*16 -8, 5*16 -8],
    type: DestinationType.WILD,
    icons: ["cave_entrance"],
    rooms: {
        wild: ROUTE_VICTOIRE
    },
    preload,
    locked(){
        return gameState.player.badges.length < 8
    },
    customRoomOrder(){ return ["wild"] }
}

export const ROUTE_VICTOIRE_SORTIE: Destination = {
    ref: "ROUTE_VICTOIRE_SORTIE",
    name: "Route Victoire (Sortie)",
    subtext: "Voyage rapide",
    nextDestinations: {
        LIGUE: [[0,1],[1,0],[0,-1]]
    },
    coordinates: [1*16 -8, 3*16 -8],
    type: DestinationType.SPECIAL,
    icons: ["cave_entrance"],
    rooms: {
        wild: ROUTE_VICTOIRE
    },
    preload,
    customRoomOrder(){ return ["wild"] }
}

function preload(scene: MyScene){    
    preloadMusic("music_route_victoire", "assets/audio/music/22 The Last Road.mp3");
    scene.load.tilemapTiledJSON('route_victoire', 'assets/maps/route_victoire.json');
}


