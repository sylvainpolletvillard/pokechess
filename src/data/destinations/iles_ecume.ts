import {Destination, DestinationType, RoomType} from "../../logic/destination";
import { spawnWildTeamByType } from "../../logic/spawns";
import { TYPE_EAU, TYPE_NORMAL, TYPE_PLANTE } from "../types";

export const ILES_ECUME: Destination = {
    ref: "ILES_ECUME",
    name: "Îles Écume",
    nextDestinations: {
        CRAMOISILE: [[-4,0]],
        PARMANIE: [[3,0],[0,-3]]
    },
    coordinates: [152,294],
    type: DestinationType.WILD,
    icons: ["type_EAU"],
    subtext: "Capture",
    rooms: {
        wild: {
            type: RoomType.WILD,
            music: "",
            name: "Grotte Azurée",
            map: "grotte_azuree",
            spawnOtherTeam(){
                return spawnWildTeamByType({                    
                    [TYPE_EAU.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.2,
                    [TYPE_PLANTE.ref]: 0.2,
                })
            }
        }
    }
}