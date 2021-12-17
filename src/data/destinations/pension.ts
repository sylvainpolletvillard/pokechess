import {Destination, DestinationType, RoomType} from "../../model/destination";
import {spawnWildTeamByType} from "../../logic/spawns";
import {TYPE_NORMAL} from "../types";

export const PENSION: Destination = {
    ref: "PENSION",
    name: "Pension",
    nextDestinations: {
        AZURIA: [[0,-2]],
        SAFRANIA: [[0,2]]
    },
    coordinates: [216,74],
    type: DestinationType.SPECIAL,
    icons: ["type_NORMAL"],
    subtext: "Éleveur",
    getRoomOrder(){ return ["pension"] },
    rooms: {
        pension: {
            type: RoomType.WILD,
            music: "",
            map: "",
            name: "Pension",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_NORMAL.ref]: 1
                })
            }
        }
    }
}