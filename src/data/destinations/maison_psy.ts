import {Destination, DestinationType, RoomType} from "../../logic/destination";
import { spawnWildTeamByType } from "../../logic/spawns";
import { TYPE_PSY, TYPE_NORMAL, TYPE_PLANTE, TYPE_FEU } from "../types";

export const MAISON_PSY: Destination = {
    ref: "MAISON_PSY",
    name: "Maison de Mr Psy",
    nextDestinations: {
        SAFRANIA: [[0,-1.5]],
        CARMIN: [[0,2.5]]
    },
    coordinates: [216,128],
    type: DestinationType.WILD,
    icons: ["type_PSY"],
    subtext: "Capture",
    rooms: {
        wild: {
            type: RoomType.WILD,
            music: "",
            name: "Grotte Azurée",
            map: "grotte_azuree",
            spawnOtherTeam(){
                return spawnWildTeamByType({                    
                    [TYPE_PSY.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.2,
                    [TYPE_PLANTE.ref]: 0.2,
                    [TYPE_FEU.ref]: 0.2,
                })
            }
        }
    }
}