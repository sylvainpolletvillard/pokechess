import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const LEVEINARD: PokemonEntry = {
    ref: "leveinard",
    name: "Leveinard",
    maxPV: 250,
    maxPP: 20,
    attack: 5,
    defense: 5,
    speed: 50,
    types: [POKEMON_TYPES.NORMAL],
    rank: 3,
    baseSkill: SKILLS.FLAMMECHE, // torgnoles
    ppSkill: SKILLS.LANCE_SOLEIL // E-Coque
}