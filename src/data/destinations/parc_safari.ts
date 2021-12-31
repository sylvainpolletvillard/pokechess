import {Destination, DestinationType, RoomType} from "../../logic/destination";

export const PARC_SAFARI: Destination = {
    ref: "PARC_SAFARI",
    name: "Parc Safari",
    nextDestinations: {
        PARMANIE: [[0,2]],
    },
    coordinates: [200,212],
    type: DestinationType.SPECIAL,
    icons: ["safari"],
    subtext: "Capture à gogo",
    rooms: {
        safari: {
            type: RoomType.SAFARI,
            name: "Parc Safari",
            map: "safari",
            music: "",
        }
    }
}