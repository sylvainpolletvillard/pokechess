import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const NIDOQUEEN: PokemonEntry = {
    ref: "nidoqueen",
    name: "Nidoqueen",
    maxPV: 90,
    maxPP: 20,
    attack: 82,
    defense: 87,
    speed: 76,
    types: [POKEMON_TYPES.POISON, POKEMON_TYPES.SOL],
    rank: 1,
    baseSkill: SKILLS.DOUBLE_PIED,
    ppSkill: SKILLS.RUGISSEMENT,
    wildEncounterChance: 0,
    portraitCropY: 9
}