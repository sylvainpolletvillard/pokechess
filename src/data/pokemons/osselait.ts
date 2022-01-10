import {POKEMON_TYPES} from "../types";
import {OSSATUEUR} from "./ossatueur";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const OSSELAIT: PokemonEntry = {
    ref: "osselait",
    name: "Osselait",
    maxPV: 50,
    maxPP: 20,
    attack: 50,

    defense: 95,
    speed: 35,
    types: [POKEMON_TYPES.SOL],
    evolution: OSSATUEUR,
    evolutionLevel: 28,
    rank: 1,
    baseSkill: SKILLS.FLAMMECHE, // mass d'os
    ppSkill: SKILLS.LANCE_SOLEIL // rugissement
}