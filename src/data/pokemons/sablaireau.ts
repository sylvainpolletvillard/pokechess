import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const SABLAIREAU: PokemonEntry = {
    ref: "sablaireau",
    name: "Sablaireau",
    maxPV: 75,
    maxPP: 15,
    attack: 100,
    defense: 110,
    speed: 65,
    types: [POKEMON_TYPES.SOL],
    rank: 2,
    baseSkill: SKILLS.GRIFFE,
    ppSkill: SKILLS.JET_DE_SABLE,
    wildEncounterChance: 0
}