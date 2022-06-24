import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ALAKAZAM: PokemonEntry = {
    ref: "alakazam",
    name: "Alakazam",
    maxPV: 55,
    maxPP: 10,
    attack: 40,
    defense: 45,
    speed: 120,
    types: [POKEMON_TYPES.PSY],
    rank: 3,
    baseSkill: SKILLS.CHOC_MENTAL,
    ppSkill: SKILLS.TELEPORT,
    wildEncounterChance: 0
}