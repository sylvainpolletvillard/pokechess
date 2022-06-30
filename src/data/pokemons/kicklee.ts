import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const KICKLEE: PokemonEntry = {
    ref: "kicklee",
    name: "Kicklee",
    maxPV: 50,
    maxPP: 12,
    attack: 120,
    defense: 53,
    speed: 87,
    types: [POKEMON_TYPES.COMBAT],
    rank: 2,
    baseSkill: SKILLS.DOUBLE_PIED,
    ppSkill: SKILLS.MAWASHI_GERI,
    wildEncounterChance: 0.75
}