import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const TRIOPIKEUR: PokemonEntry = {
    ref: "triopikeur",
    name: "Triopikeur",
    maxPV: 35,
    maxPP: 15,
    attack: 100,
    defense: 50,
    speed: 120,
    types: [POKEMON_TYPES.SOL],
    rank: 2,
    baseSkill: SKILLS.TRIPLATTAQUE,
    ppSkill: SKILLS.TUNNEL,
    wildEncounterChance: 0
}