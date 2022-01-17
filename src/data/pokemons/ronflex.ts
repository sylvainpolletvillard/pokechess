import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const RONFLEX: PokemonEntry = {
    ref: "ronflex",
    name: "Ronflex",
    maxPV: 160,
    maxPP: 20,
    attack: 110,
    defense: 65,
    speed: 30,
    types: [POKEMON_TYPES.NORMAL],
    rank: 3,
    baseSkill: SKILLS.FLAMMECHE, // roulade
    ppSkill: SKILLS.REPOS
}