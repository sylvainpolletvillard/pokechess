import {Destination, DestinationType} from "../../model/destination";

export const FALAISES: Destination = {
    ref: "FALAISES",
    name: "Falaises",
    nextDestinations: {
        LAVANVILLE: [[0,-4]],
        CARMIN: [[-2,0],[-3,0]],
        CAMP_NOMADE: [[0,3]],
        CAVE_TAUPIQUEUR_EST: [[-2,0],[0,-1]]
    },
    coordinates: [296,168],
    type: DestinationType.WILD,
    icons: ["type_ROCHE"],
    subtext: "Capture",
    getRoomOrder(){ return ["wild"] },
    rooms: {}
}