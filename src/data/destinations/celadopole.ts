import {Destination, DestinationType} from "../../model/destination";

export const CELADOPOLE: Destination = {
    ref: "CELADOPOLE",
    name: "Céladopole",
    nextDestinations: {
        ARGENTA: [[0,-2],[-2,0]],
        COLLINE_ROYALE: [[0,-2],[2,0]],
        DOJO: [[3,0]],
        PISTE_CYCLABLE: [[0,5]]
    },
    coordinates: [136,104],
    type: DestinationType.ARENA,
    icons: ["type_PLANTE"],
    subtext: "Arène",
    getRoomOrder(){ return ["arena"] },
    rooms: {}
}