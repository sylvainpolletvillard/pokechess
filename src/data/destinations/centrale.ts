import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnWildTeamByType} from "../../logic/spawns";
import {
    TYPE_COMBAT,
    TYPE_EAU,
    TYPE_ELECTRIQUE,
    TYPE_NORMAL,
} from "../types";

export const CENTRALE: Destination = {
    ref: "CENTRALE",
    name: "Centrale",
    nextDestinations: {
        AZURIA: [[0,-1],[-1,0],[0,-1],[-2,0]],
        OCEANE_AZURIA: [[0,-1],[-1,0],[0,-1],[0,-1],[1,0],[0,-1]],
        LAVANVILLE: [[1,0],[0,1],[1,0],[0,1]]
    },
    coordinates: [264,70],
    type: DestinationType.WILD,
    icons: ["type_ELECTRIQUE"],
    subtext: "Capture",
    getRoomOrder(){ return ["centrale"] },
    rooms: {
        centrale: {
            type: RoomType.WILD,
            name: "Centrale électrique",
            music: "",
            map: "centrale",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_ELECTRIQUE.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.5,
                    [TYPE_EAU.ref]: 0.5,
                    [TYPE_COMBAT.ref]: 0.2
                })
            }
        }
    }
}