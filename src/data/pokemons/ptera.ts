import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const PTERA: PokemonEntry = {
    ref: "ptera",
    name: "Ptera",
    maxPV: 80,
    maxPP: 20,
    attack: 105,
    defense: 65,
    speed: 130,
    types: [POKEMON_TYPES.DRAGON, POKEMON_TYPES.ROCHE],
    rank: 3,
    baseSkill: SKILLS.CRUAILE,
    ppSkill: SKILLS.POUVOIR_ANTIQUE
}