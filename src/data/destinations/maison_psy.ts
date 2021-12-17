import {Destination, DestinationType} from "../../model/destination";

export const MAISON_PSY: Destination = {
    ref: "MAISON_PSY",
    name: "Maison de Mr Psy",
    nextDestinations: {
        SAFRANIA: [[0,-1.5]],
        CARMIN: [[0,2.5]]
    },
    coordinates: [216,128],
    type: DestinationType.WILD,
    icons: ["type_PSY"],
    subtext: "Capture",
    getRoomOrder(){ return ["wild"] },
    rooms: {}
}