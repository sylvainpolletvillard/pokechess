import {POKEMON_TYPES} from "../types";
import {RHINOFEROS} from "./rhinoferos";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const RHINOCORNE: PokemonEntry = {
    ref: "rhinocorne",
    name: "Rhinocorne",
    maxPV: 80,
    maxPP: 20,
    attack: 85,
    attackRange: 1,
    defense: 95,
    speed: 25,
    types: [POKEMON_TYPES.ROCHE, POKEMON_TYPES.SOL],
    evolution: RHINOFEROS,
    evolutionLevel: 42,
    rank: 1,
    baseSkill: SKILLS.FLAMMECHE, // koud'korne
    ppSkill: SKILLS.LANCE_SOLEIL // Empal'Korne
}