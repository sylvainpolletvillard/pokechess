import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnTeamByTypeFactor} from "../../logic/spawns";
import {TYPE_NORMAL} from "../types";
import {DRESSEUR_PENSION} from "../trainers";

export const PENSION: Destination = {
    ref: "PENSION",
    name: "Pension",
    nextDestinations: {
        AZURIA: [[0,-2]],
        SAFRANIA: [[0,2]]
    },
    coordinates: [216,74],
    type: DestinationType.SPECIAL,
    icons: ["type_NORMAL"],
    subtext: "Élevage",
    rooms: {
        pension: {
            name: "Pension",
            type: RoomType.PENSION,
            trainer: DRESSEUR_PENSION,
            music: "music_pension",
            map: "pension",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_NORMAL.ref]: 1
                })
            }
        }
    }
}