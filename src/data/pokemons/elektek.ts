import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ELEKTEK: PokemonEntry = {
    ref: "elektek",
    name: "Elektek",
    maxPV: 65,
    maxPP: 20,
    attack: 83,
    defense: 57,
    speed: 105,
    types: [POKEMON_TYPES.ELECTRIQUE],
    rank: 2,
    baseSkill: SKILLS.ETINCELLE,
    ppSkill: SKILLS.TONNERRE,
    wildEncounterChance: 0.5
}