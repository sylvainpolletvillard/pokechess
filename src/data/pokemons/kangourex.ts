import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const KANGOUREX: PokemonEntry = {
    ref: "kangourex",
    name: "Kangourex",
    maxPV: 105,
    maxPP: 20,
    attack: 95,

    defense: 80,
    speed: 90,
    types: [POKEMON_TYPES.NORMAL],
    rank: 2,
    baseSkill: SKILLS.FLAMMECHE, // frénésie
    ppSkill: SKILLS.LANCE_SOLEIL // Ultimapoing
}