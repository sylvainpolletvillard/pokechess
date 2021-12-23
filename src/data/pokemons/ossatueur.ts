import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const OSSATUEUR: PokemonEntry = {
    ref: "ossatueur",
    name: "Ossatueur",
    maxPV: 60,
    maxPP: 20,
    attack: 80,
    attackRange: 3,
    defense: 110,
    speed: 45,
    types: [POKEMON_TYPES.SOL],
    rank: 2,
    baseSkill: SKILLS.FLAMMECHE, // mass d'os
    ppSkill: SKILLS.LANCE_SOLEIL // rugissement
}