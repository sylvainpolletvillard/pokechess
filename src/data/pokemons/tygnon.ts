import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const TYGNON: PokemonEntry = {
    ref: "tygnon",
    name: "Tygnon",
    maxPV: 50,
    maxPP: 20,
    attack: 105,

    defense: 79,
    speed: 76,
    types: [POKEMON_TYPES.COMBAT],
    rank: 2,
    baseSkill: SKILLS.FLAMMECHE, // riposte
    ppSkill: SKILLS.LANCE_SOLEIL // ultimapoing
}