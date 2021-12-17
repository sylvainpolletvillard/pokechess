import {Destination, DestinationType, RoomType} from "../../model/destination";
import {spawnWildTeamByType} from "../../logic/spawns";
import {TYPE_VOL, TYPE_GLACE, TYPE_ROCHE, TYPE_EAU, TYPE_NORMAL} from "../types";

export const COL_DE_MONTAGNE: Destination = {
    ref: "COL_DE_MONTAGNE",
    name: "Col de Montagne",
    nextDestinations: {
        ARGENTA: [[0,1],[-1,0],[0,1]],
        MONT_SELENITE: [[2,0]],
        AZURIA: [[2,0],[4,0]]
    },
    coordinates: [122,40],
    type: DestinationType.WILD,
    icons: ["type_VOL"],
    subtext: "Capture",
    getRoomOrder(){ return ["wild"] },
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Col de Montagne",
            music: "music_battle_wild",
            map: "col_de_montagne",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_VOL.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.2,
                    [TYPE_GLACE.ref]: 0.2,
                    [TYPE_ROCHE.ref]: 0.2,
                    [TYPE_EAU.ref]: 0.1,
                })
            }
        }
    }
}