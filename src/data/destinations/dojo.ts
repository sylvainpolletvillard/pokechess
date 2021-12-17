import {Destination, DestinationType} from "../../model/destination";

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
    getRoomOrder(){ return ["dojo"] },
    rooms: {}
}