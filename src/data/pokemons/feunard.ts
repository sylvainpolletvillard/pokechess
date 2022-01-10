import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const FEUNARD: PokemonEntry = {
    ref: "feunard",
    name: "Feunard",
    maxPV: 73,
    maxPP: 20,
    attack: 76,

    defense: 75,
    speed: 100,
    types: [POKEMON_TYPES.FEU],
    rank: 3,
    baseSkill: SKILLS.FLAMMECHE,
    ppSkill: SKILLS.LANCE_SOLEIL // danse flammes
}