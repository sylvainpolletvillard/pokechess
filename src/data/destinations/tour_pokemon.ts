import {Destination, DestinationType, RoomType} from "../../logic/destination";
import { TYPE_NORMAL, TYPE_PSY, TYPE_SPECTRE} from "../types";
import {spawnWildTeamByType} from "../../logic/spawns";

export const TOUR_POKEMON: Destination = {
    ref: "TOUR_POKEMON",
    name: "Tour Pokémon",
    nextDestinations: {
        SAFRANIA: [[-2,0]],
        LAVANVILLE: [[3,0]]
    },
    coordinates: [248,104],
    type: DestinationType.WILD,
    icons: ["type_SPECTRE"],
    subtext: "Capture",
    getRoomOrder(){ return ["wild"] },
    rooms: {
        wild: {
            name: "Tour Pokémon",
            type: RoomType.WILD,
            map: "",
            music: "",
            spawnOtherTeam(){
                return spawnWildTeamByType({
                    [TYPE_SPECTRE.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.2,
                    [TYPE_PSY.ref]: 0.2
                })
            }
        }
    }
}