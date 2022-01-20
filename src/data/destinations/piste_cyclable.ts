import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnWildTeamByType} from "../../logic/spawns";
import {TYPE_ELECTRIQUE, TYPE_NORMAL, TYPE_POISON} from "../types";

export const PISTE_CYCLABLE: Destination = {
    ref: "PISTE_CYCLABLE",
    name: "Piste Cyclable",
    nextDestinations: {
        CELADOPOLE: [[0,-5]],
        PARMANIE: [[0,4],[4,0]]
    },
    coordinates: [136,184],
    type: DestinationType.WILD,
    icons: ["type_POISON"],
    subtext: "Capture",
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "",
            map: "",
            music: "",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_POISON.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.4,
                    [TYPE_ELECTRIQUE.ref]: 0.4
                })
            }
        }
    }
}