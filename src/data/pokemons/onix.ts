import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ONIX: PokemonEntry = {
    ref: "onix",
    name: "Onix",
    maxPV: 35,
    maxPP: 20,
    attack: 45,
    defense: 160,
    speed: 70,
    types: [POKEMON_TYPES.ROCHE, POKEMON_TYPES.SOL],
    rank: 1,
    baseSkill: SKILLS.JET_PIERRES,
    ppSkill: SKILLS.ARMURE,
    wildEncounterChance: 1,
    portraitCropY: 30
}