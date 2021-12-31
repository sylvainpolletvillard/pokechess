import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {TYPE_FEU, TYPE_NORMAL, TYPE_ROCHE, TYPE_SOL} from "../types";
import {spawnWildTeamByType} from "../../logic/spawns";

export const MONT_BRAISE: Destination = {
    ref: "MONT_BRAISE",
    name: "Mont Braise",
    nextDestinations: {
        BOURG_PALETTE: [[3,-0.5], [0,-1.5], [-1,0]],
        CRAMOISILE: [[3,-0.5],[0,2.5]]
    },
    coordinates: [3*16-8, 320-3.5*16],
    type: DestinationType.WILD,
    icons: ["type_FEU"],
    subtext: "Capture",
    getRoomOrder(){ return ["wild"] },
    rooms: {
        wild:  {
            name: "Mont Braise",
            map: "mont_braise",
            type: RoomType.WILD,
            music: "music_battle_wild",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_FEU.ref]: 1,
                    [TYPE_SOL.ref]: 0.1,
                    [TYPE_ROCHE.ref]: 0.1,
                    [TYPE_NORMAL.ref]: 0.1
                })
            }
        }
    }
}