import {Destination, DestinationType, RoomType} from "../../logic/destination";
import { spawnWildTeamByType } from "../../logic/spawns";
import { TYPE_ROCHE, TYPE_EAU, TYPE_VOL, TYPE_SOL } from "../types";

export const FALAISES: Destination = {
    ref: "FALAISES",
    name: "Falaises",
    nextDestinations: {
        LAVANVILLE: [[0,-4]],
        CARMIN: [[-2,0],[-3,0]],
        CAMP_NOMADE: [[0,3]],
        CAVE_TAUPIQUEUR_EST: [[-2,0],[0,-1]]
    },
    coordinates: [296,168],
    type: DestinationType.WILD,
    icons: ["type_ROCHE"],
    subtext: "Capture",
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Falaises",
            map: "foret_de_jade",
            music: "music_foret_jade",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_ROCHE.ref]: 1,
                    [TYPE_EAU.ref]: 1,
                    [TYPE_VOL.ref]: 1,
                    [TYPE_SOL.ref]: 0.5
                })
            },
        }
    }
}