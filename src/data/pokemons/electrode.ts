import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ELECTRODE: PokemonEntry = {
    ref: "electrode",
    name: "Electrode",
    maxPV: 60,
    maxPP: 50,
    attack: 50,
    defense: 70,
    speed: 150,
    types: [POKEMON_TYPES.ELECTRIQUE],
    rank: 2,
    baseSkill: SKILLS.CHARGE,
    ppSkill: SKILLS.DESTRUCTION,
    wildEncounterChance: 0
}