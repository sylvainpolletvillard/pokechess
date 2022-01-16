import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const KICKLEE: PokemonEntry = {
    ref: "kicklee",
    name: "Kicklee",
    maxPV: 50,
    maxPP: 20,
    attack: 120,
    defense: 53,
    speed: 87,
    types: [POKEMON_TYPES.COMBAT],
    rank: 2,
    baseSkill: SKILLS.FLAMMECHE, // double pied
    ppSkill: SKILLS.LANCE_SOLEIL // mawashi Geri
}