import {Destination, DestinationType, RoomType, RoomWild} from "../../model/destination";
import {spawnWildTeamByType} from "../../logic/spawns";
import {TYPE_INSECTE, TYPE_ROCHE, TYPE_SOL, TYPE_SPECTRE} from "../types";

const ROOM_TAUPIQUEUR: RoomWild =  {
    type: RoomType.WILD,
    name: "Cave taupiqueur",
    music: "",
    map: "cave_taupiqueur",
    spawnOtherTeam(){
        return spawnWildTeamByType({
            [TYPE_SOL.ref]: 1,
            [TYPE_ROCHE.ref]: 0.2,
            [TYPE_INSECTE.ref]: 0.2,
            [TYPE_SPECTRE.ref]: 0.1
        })
    }
}

export const CAVE_TAUPIQUEUR_OUEST: Destination = {
    ref: "CAVE_TAUPIQUEUR_OUEST",
    name: "Cave Taupiqueur (Entrée Ouest)",
    nextDestinations: {
        JADIELLE: [[0,1.5],[-2,0]],
    },
    coordinates: [104,156],
    type: DestinationType.SPECIAL,
    icons: ["cave_entrance", "type_SOL"],
    subtext: "Voyage rapide et Capture",
    getRoomOrder(){ return ["cave"] },
    rooms: { cave: ROOM_TAUPIQUEUR }
}

export const CAVE_TAUPIQUEUR_EST: Destination = {
    ref: "CAVE_TAUPIQUEUR_EST",
    name: "Cave Taupiqueur (Entrée Est)",
    nextDestinations: {
        CARMIN: [[0,1],[-3,0]],
        FALAISES: [[0,1],[2,0]]
    },
    coordinates: [264,150],
    type: DestinationType.SPECIAL,
    icons: ["cave_entrance","type_SOL"],
    subtext: "Voyage rapide et Capture",
    getRoomOrder(){ return ["cave"] },
    rooms: { cave: ROOM_TAUPIQUEUR }
}