import {Destination, DestinationType, RoomType} from "../../logic/destination";
import {spawnWildTeamByType} from "../../logic/spawns";
import {TYPE_FEE, TYPE_INSECTE, TYPE_PLANTE, TYPE_POISON} from "../types";

export const FORET_JADE: Destination = {
    ref: "FORET_JADE",
    name: "Forêt de Jade",
    nextDestinations: {
        JADIELLE: [[0,3]],
        ARGENTA: [[0,-4],[2,0]]
    },
    coordinates: [72,136],
    type: DestinationType.WILD,
    icons: ["type_INSECTE"],
    subtext: "Capture",
    getRoomOrder(){ return ["wild"] },
    rooms: {
        wild: {
            type: RoomType.WILD,
            name: "Forêt de Jade",
            map: "foret_de_jade",
            music: "music_foret_jade",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_INSECTE.ref]: 1,
                    [TYPE_PLANTE.ref]: 0.2,
                    [TYPE_POISON.ref]: 0.2,
                    [TYPE_FEE.ref]: 0.05,
                })
            },
        }
    }
}