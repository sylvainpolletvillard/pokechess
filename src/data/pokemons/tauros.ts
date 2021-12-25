import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const TAUROS: PokemonEntry = {
    ref: "tauros",
    name: "Tauros",
    maxPV: 75,
    maxPP: 20,
    attack: 100,
    attackRange: 1,
    defense: 95,
    speed: 110,
    types: [POKEMON_TYPES.NORMAL],
    rank: 2,
    baseSkill: SKILLS.FLAMMECHE, // charge
    ppSkill: SKILLS.LANCE_SOLEIL // bélier
}