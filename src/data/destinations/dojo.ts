import {Destination, DestinationType, RoomType} from "../../logic/destination";
import { spawnWildTeamByType } from "../../logic/spawns";
import { TYPE_COMBAT, TYPE_NORMAL, TYPE_INSECTE, TYPE_FEU, TYPE_PSY } from "../types";

export const DOJO: Destination = {
    ref: "DOJO",
    name: "DOJO",
    nextDestinations: {
        SAFRANIA: [[2,0]],
        CELADOPOLE: [[-3,0]]
    },
    coordinates: [184,104],
    type: DestinationType.WILD,
    icons: ["type_COMBAT"],
    subtext: "Capture",
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Dojo",
            map: "foret_de_jade",
            music: "music_foret_jade",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_COMBAT.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.2,
                    [TYPE_INSECTE.ref]: 0.2,
                    [TYPE_FEU.ref]: 0.2,
                    [TYPE_PSY.ref]: 0.2,
                })
            },
        }
    }
}