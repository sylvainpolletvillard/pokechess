import {POKEMON_TYPES} from "../types";
import {GROLEM} from "./grolem";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const GRAVALANCH: PokemonEntry = {
    ref: "gravalanch",
    name: "Gravalanch",
    maxPV: 55,
    maxPP: 20,
    attack: 95,
    defense: 115,
    speed: 35,
    types: [POKEMON_TYPES.ROCHE, POKEMON_TYPES.SOL],
    evolution: GROLEM,
    evolutionLevel: 38,
    rank: 2,
    baseSkill: SKILLS.JET_PIERRES,
    ppSkill: SKILLS.ARMURE,
    wildEncounterChance: 0,
    portraitCropY: 20
}