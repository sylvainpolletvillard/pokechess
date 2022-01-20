import {Destination, DestinationType, RoomType} from "../../logic/destination";
import { spawnWildTeamByType } from "../../logic/spawns";
import { TYPE_DRAGON, TYPE_VOL, TYPE_COMBAT } from "../types";

export const COLLINE_ROYALE: Destination = {
    ref: "COLLINE_ROYALE",
    name: "Colline des Rois",
    nextDestinations: {
        ARGENTA: [[-2,0],[-2,0]],
        CELADOPOLE: [[-2,0],[0,2]]
    },
    coordinates: [168,72],
    type: DestinationType.WILD,
    icons: ["type_DRAGON"],
    subtext: "Capture",
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Colline des Rois",
            map: "foret_de_jade",
            music: "music_foret_jade",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_DRAGON.ref]: 1,
                    [TYPE_VOL.ref]: 0.5,
                    [TYPE_COMBAT.ref]: 0.2,
                })
            },
        }
    }
}