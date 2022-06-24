import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MAGMAR: PokemonEntry = {
    ref: "magmar",
    name: "Magmar",
    maxPV: 65,
    maxPP: 20,
    attack: 95,
    defense: 57,
    speed: 93,
    types: [POKEMON_TYPES.FEU],
    rank: 2,
    baseSkill: SKILLS.FLAMMECHE,
    ppSkill: SKILLS.BROUILLARD,
    wildEncounterChance: 0.5
}