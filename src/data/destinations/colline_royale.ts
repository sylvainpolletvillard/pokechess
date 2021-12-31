import {Destination, DestinationType} from "../../logic/destination";

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
    getRoomOrder(){ return ["wild"] },
    rooms: {}
}