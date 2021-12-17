import {Destination, DestinationType, RoomType} from "../../model/destination";
import {spawnWildTeamByType} from "../../logic/spawns";
import {TYPE_DRAGON, TYPE_EAU, TYPE_GLACE, TYPE_ROCHE} from "../types";

export const GROTTE_AZUREE: Destination = {
    ref: "GROTTE_AZUREE",
    name: "Grotte Azurée",
    nextDestinations: {
        AZURIA: [[0,2]]
    },
    coordinates: [216,8],
    type: DestinationType.WILD,
    icons: ["type_GLACE"],
    subtext: "Capture",
    getRoomOrder(){ return ["wild"] },
    rooms: {
        wild: {
            type: RoomType.WILD,
            music: "",
            name: "Grotte Azurée",
            map: "grotte_azuree",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_GLACE.ref]: 0.5,
                    [TYPE_EAU.ref]: 0.5,
                    [TYPE_DRAGON.ref]: 0.3,
                    [TYPE_ROCHE.ref]: 0.2,
                })
            }
        }
    }
}