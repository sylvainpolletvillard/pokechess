import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const EXCELANGUE: PokemonEntry = {
    ref: "excelangue",
    name: "Excelangue",
    maxPV: 50,
    maxPP: 20,
    attack: 105,
    defense: 79,
    speed: 76,
    types: [POKEMON_TYPES.NORMAL],
    rank: 2,
    baseSkill: SKILLS.FLAMMECHE, // léchouille
    ppSkill: SKILLS.LANCE_SOLEIL // ultrason
}