import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {TRIOPIKEUR} from "./triopikeur";
import {PokemonEntry} from "../pokemons";

export const TAUPIQUEUR: PokemonEntry = {
    ref: "taupiqueur",
    name: "Taupiqueur",
    maxPV: 10,
    maxPP: 20,
    attack: 55,
    attackRange: 3,
    defense: 25,
    speed: 95,
    types: [POKEMON_TYPES.SOL],
    evolution: TRIOPIKEUR,
    evolutionLevel: 26,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // coud'boue
    ppSkill: SKILLS.LANCE_SOLEIL // tunnel
}