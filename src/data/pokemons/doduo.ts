import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";
import { DODRIO } from "./dodrio";

export const DODUO: PokemonEntry = {
    ref: "doduo",
    name: "Doduo",
    maxPV: 35,
    maxPP: 20,
    attack: 85,

    defense: 45,
    speed: 75,
    types: [POKEMON_TYPES.NORMAL, POKEMON_TYPES.VOL],
    evolution: DODRIO,
    evolutionLevel: 31,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // vive attaque
    ppSkill: SKILLS.LANCE_SOLEIL // furie
}