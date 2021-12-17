import {Destination, DestinationType} from "../../model/destination";

export const ILES_ECUME: Destination = {
    ref: "ILES_ECUME",
    name: "Îles Écume",
    nextDestinations: {
        CRAMOISILE: [[-4,0]],
        PARMANIE: [[3,0],[0,-3]]
    },
    coordinates: [152,294],
    type: DestinationType.WILD,
    icons: ["type_EAU"],
    subtext: "Capture",
    getRoomOrder(){ return ["wild"] },
    rooms: {}
}