import {Destination, DestinationType} from "../../logic/destination";

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
    getRoomOrder(){ return ["wild"] },
    rooms: {}
}