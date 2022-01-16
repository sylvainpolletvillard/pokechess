import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {SABLAIREAU} from "./sablaireau";
import {PokemonEntry} from "../pokemons";

export const SABELETTE: PokemonEntry = {
    ref: "sabelette",
    name: "Sabelette",
    maxPV: 50,
    maxPP: 20,
    attack: 75,
    defense: 85,
    speed: 40,
    types: [POKEMON_TYPES.SOL],
    evolution: SABLAIREAU,
    evolutionLevel: 22,
    rank: 1,
    baseSkill: SKILLS.GRIFFE,
    ppSkill: SKILLS.LANCE_SOLEIL // jet de sable
}