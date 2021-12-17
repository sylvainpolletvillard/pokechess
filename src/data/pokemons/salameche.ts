import {POKEMON_TYPES} from "../types";
import {REPTINCEL} from "./reptincel";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const SALAMECHE: PokemonEntry = {
    ref: "salameche",
    name: "Salameche",
    maxPV: 39,
    maxPP: 20,
    attack: 52,
    attackRange: 1,
    defense: 43,
    speed: 65,
    types: [POKEMON_TYPES.FEU],
    evolution: REPTINCEL,
    evolutionLevel: 16,
    rank: 1,
    baseSkill: SKILLS.FLAMMECHE, // pistolet à eau
    ppSkill: SKILLS.LANCE_SOLEIL // hydrocanon
}