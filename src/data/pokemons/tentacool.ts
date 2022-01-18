import {POKEMON_TYPES} from "../types";
import {TENTACRUEL} from "./tentacruel";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const TENTACOOL: PokemonEntry = {
    ref: "tentacool",
    name: "Tentacool",
    maxPV: 40,
    maxPP: 20,
    attack: 40,
    defense: 35,
    speed: 70,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.POISON],
    evolution: TENTACRUEL,
    evolutionLevel: 30,
    rank: 1,
    baseSkill: SKILLS.DARD_VENIN,
    ppSkill: SKILLS.LIGOTAGE
}