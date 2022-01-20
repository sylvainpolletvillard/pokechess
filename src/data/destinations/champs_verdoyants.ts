import {Destination, DestinationType, RoomType} from "../../logic/destination";
import { spawnWildTeamByType } from "../../logic/spawns";
import { TYPE_PLANTE, TYPE_NORMAL, TYPE_INSECTE, TYPE_POISON, TYPE_SOL } from "../types";

export const CHAMPS_VERDOYANTS: Destination = {
    ref: "CHAMPS_VERDOYANTS",
    name: "Champs verdoyants",
    nextDestinations: {
        CAMP_NOMADE: [[0,-1],[2,0]],
        PARMANIE: [[-1,0],[0,1],[-3,0]]
    },
    coordinates: [264,232],
    type: DestinationType.WILD,
    icons: ["type_PLANTE"],
    subtext: "Capture",
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Forêt de Jade",
            map: "foret_de_jade",
            music: "music_foret_jade",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_PLANTE.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.2,
                    [TYPE_INSECTE.ref]: 0.2,
                    [TYPE_POISON.ref]: 0.2,
                    [TYPE_SOL.ref]: 0.2,
                })
            },
        }
    }
}