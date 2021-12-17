import {Destination, DestinationType, RoomType} from "../../model/destination";
import {spawnWildTeamByType} from "../../logic/spawns";
import {TYPE_EAU, TYPE_FEE, TYPE_NORMAL, TYPE_PSY, TYPE_ROCHE, TYPE_SOL, TYPE_SPECTRE} from "../types";

export const MONT_SELENITE: Destination = {
    ref: "MONT_SELENITE",
    name: "Mont Selenite",
    nextDestinations: {
        COL_DE_MONTAGNE: [[0,1],[-2,0]],
        JADIELLE: [[0,1],[2,0]],
        AZURIA: [[0,1],[4,0]]
    },
    coordinates: [152,24],
    type: DestinationType.SPECIAL,
    icons: ["type_FEE"],
    subtext: "Paléontologie et Capture",
    getRoomOrder(){ return ["wild"] },
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Mont Sélénite",
            map: "mont_selenite",
            music: "",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_FEE.ref]: 1,
                    [TYPE_SOL.ref]: 0.5,
                    [TYPE_ROCHE.ref]: 0.5,
                    [TYPE_EAU.ref]: 0.5,
                    [TYPE_SPECTRE.ref]: 0.2
                })
            }
        }
    }
}