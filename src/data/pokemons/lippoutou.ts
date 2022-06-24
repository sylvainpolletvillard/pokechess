import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const LIPPOUTOU: PokemonEntry = {
    ref: "lippoutou",
    name: "Lippoutou",
    maxPV: 65,
    maxPP: 20,
    attack: 50,
    defense: 35,
    speed: 95,
    types: [POKEMON_TYPES.GLACE, POKEMON_TYPES.PSY],
    rank: 2,
    baseSkill: SKILLS.POUDREUSE,
    ppSkill: SKILLS.GROBISOU,
    wildEncounterChance: 1
}