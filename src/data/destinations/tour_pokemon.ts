import {Destination, DestinationType, RoomType} from "../../logic/destination";
import { TYPE_NORMAL, TYPE_PSY, TYPE_SPECTRE} from "../types";
import {spawnTrainerTeam, spawnTeamByTypeFactor} from "../../logic/spawns";
import { DRESSEUR_TOUR_POKEMON} from "../trainers";
import {FANTOMINUS} from "../pokemons/fantominus";
import {OSSELAIT} from "../pokemons/osselait";
import {NOSFERAPTI} from "../pokemons/nosferapti";
import {MELOFEE} from "../pokemons/melofee";
import {GOUPIX} from "../pokemons/goupix";
import {ABRA} from "../pokemons/abra";
import {RATTATA} from "../pokemons/rattata";

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
    rooms: {
        wild: {
            name: "Tour Pokémon",
            type: RoomType.WILD,
            map: "tour_pokemon",
            music: "music_tour_pokemon",
            spawnOtherTeam(){
                return spawnTeamByTypeFactor({
                    [TYPE_SPECTRE.ref]: 1,
                    [TYPE_NORMAL.ref]: 0.2,
                    [TYPE_PSY.ref]: 0.2
                })
            }
        },
        trainer: {
            type: RoomType.ARENA,
            name: "Tour Pokémon",
            map: "tour_pokemon",
            music: "music_tour_pokemon",
            trainer: DRESSEUR_TOUR_POKEMON,
            spawnOtherTeam(){
                return spawnTrainerTeam([
                    FANTOMINUS,
                    FANTOMINUS,
                    FANTOMINUS,
                    OSSELAIT,
                    NOSFERAPTI,
                    GOUPIX,
                    MELOFEE,
                    ABRA,
                    RATTATA
                ])
            }
        }
    }
}