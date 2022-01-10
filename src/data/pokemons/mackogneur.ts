import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MACKOGNEUR: PokemonEntry = {
    ref: "mackogneur",
    name: "Mackogneur",
    maxPV: 90,
    maxPP: 20,
    attack: 130,

    defense: 80,
    speed: 55,
    types: [POKEMON_TYPES.COMBAT],
    rank: 3,
    baseSkill: SKILLS.FLAMMECHE, // poing karaté
    ppSkill: SKILLS.LANCE_SOLEIL // balayage
}