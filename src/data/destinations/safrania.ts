import {Destination, DestinationType, RoomType} from "../../model/destination";
import {spawnChampionTeam} from "../../logic/spawns";
import {MORGANE} from "../champions";

export const SAFRANIA: Destination = {
    ref: "SAFRANIA",
    name: "Safrania",
    nextDestinations: {
        PENSION: [[0,-2]],
        DOJO: [[-2,0]],
        TOUR_POKEMON: [[2,0]],
        MAISON_PSY: [[0,1.5]]
    },
    coordinates: [216,104],
    type: DestinationType.ARENA,
    icons: ["type_PSY"],
    subtext: "Arène",
    getRoomOrder(){ return ["arena"] },
    rooms: {
        arena: {
            type: RoomType.ARENA,
            map: "",
            name: "Arène de Safrania",
            music: "",
            champion: MORGANE,
            spawnOtherTeam(){
                return spawnChampionTeam([], [])
            }
        }
    }
}