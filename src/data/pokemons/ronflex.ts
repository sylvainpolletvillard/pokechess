import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const RONFLEX: PokemonEntry = {
    ref: "ronflex",
    name: "Ronflex",
    maxPV: 160,
    maxPP: 30,
    attack: 110,
    defense: 65,
    speed: 30,
    types: [POKEMON_TYPES.NORMAL],
    rank: 3,
    baseSkill: SKILLS.CHARGE,
    ppSkill: SKILLS.REPOS,
    wildEncounterChance: 1,
    portraitCropY: 8
}