import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const RHINOFEROS: PokemonEntry = {
    ref: "rhinoferos",
    name: "Rhinoferos",
    maxPV: 105,
    maxPP: 20,
    attack: 130,
    defense: 120,
    speed: 40,
    types: [POKEMON_TYPES.ROCHE, POKEMON_TYPES.SOL],
    rank: 3,
    baseSkill: SKILLS.KOUD_KORNE,
    ppSkill: SKILLS.EMPAL_KORNE,
    wildEncounterChance: 0
}