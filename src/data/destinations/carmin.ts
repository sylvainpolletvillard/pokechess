import {Destination, DestinationType} from "../../model/destination";

export const CARMIN: Destination = {
    ref: "CARMIN",
    name: "Carmin sur mer",
    nextDestinations: {
        MAISON_PSY: [[0,-2.5]],
        CAVE_TAUPIQUEUR_EST: [[3,0],[0,-1]],
        OCEANE_CARMIN: [[-2,0]],
        FALAISES: [[3,0],[2,0]]
    },
    coordinates: [216,168],
    type: DestinationType.ARENA,
    icons: ["type_ELECTRIQUE"],
    subtext: "Arène",
    getRoomOrder(){ return ["arena"] },
    rooms: {}
}