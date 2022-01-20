import {Destination, DestinationType, RoomType, RoomWild} from "../../logic/destination";
import {spawnWildTeamByType} from "../../logic/spawns";
import {TYPE_EAU, TYPE_VOL} from "../types";

export const OCEANE: RoomWild = {
    type: RoomType.WILD,
    music: "",
    name: "Sur l'Océane",
    map: "oceane",
    spawnOtherTeam(){
        return spawnWildTeamByType({
            [TYPE_EAU.ref]: 1,
            [TYPE_VOL.ref]: 0.2,
        })
    }
}

export const OCEANE_CARMIN: Destination = {
    ref: "OCEANE_CARMIN",
    name: "L'Océane",
    nextDestinations: {
        CARMIN: [[2,0]]
    },
    coordinates: [182,168],
    type: DestinationType.SPECIAL,
    icons: ["boat"],
    subtext: "Voyage rapide",
    rooms: { oceane: OCEANE }
}

export const OCEANE_CRAMOISILE: Destination = {
    ref: "OCEANE_CRAMOISILE",
    name: "L'Océane",
    nextDestinations: {
        CRAMOISILE: [[2,0]],
    },
    coordinates: [58,296],
    type: DestinationType.SPECIAL,
    icons: ["boat"],
    subtext: "Voyage rapide",
    rooms: { oceane: OCEANE }
}

export const OCEANE_AZURIA: Destination = {
    ref: "OCEANE_AZURIA",
    name: "L'Océane",
    nextDestinations: {
        AZURIA: [[0,1],[-1,0],[0,1],[-2,0]],
        CENTRALE: [[0,1],[-1,0],[0,2],[1,0],[0,1]]
    },
    coordinates: [264,8],
    type: DestinationType.SPECIAL,
    icons: ["boat"],
    subtext: "Voyage rapide",
    rooms: { oceane: OCEANE }
}