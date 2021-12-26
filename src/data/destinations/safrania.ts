import {Destination, DestinationType, RoomType} from "../../model/destination";
import {spawnChampionTeam} from "../../logic/spawns";
import {MORGANE} from "../champions";
import { KADABRA } from "../pokemons/kadabra";
import { AEROMITE } from "../pokemons/aeromite";
import { MR_MIME } from "../pokemons/mrmime";
import { ALAKAZAM } from "../pokemons/alakazam";
import { LIPPOUTOU } from "../pokemons/lippoutou";
import { HYPNOMADE } from "../pokemons/hypnomade";
import { NOADKOKO } from "../pokemons/noadkoko";
import { SOPORIFIK } from "../pokemons/soporifik";

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
            name: "Arène de Safrania",
            type: RoomType.ARENA,
            map: "safrania",
            music: "music_safrania",
            champion: MORGANE,
            spawnOtherTeam(){
                return spawnChampionTeam([
                        KADABRA,
                        MR_MIME,
                        SOPORIFIK,
                        HYPNOMADE,
                        ALAKAZAM,
                        LIPPOUTOU,
                        AEROMITE,
                        NOADKOKO
                    ],
                    [
                        [2,3],
                        [4,3],
                        [3,3],
                        [0,2],
                        [1,2],
                        [6,2],
                        [5,2],
                        [3,0]
                    ])
            }
    }
}