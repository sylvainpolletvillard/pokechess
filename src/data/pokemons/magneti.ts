import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {MAGNETON} from "./magneton";
import {PokemonEntry} from "../pokemons";

export const MAGNETI: PokemonEntry = {
    ref: "magneti",
    name: "Magneti",
    maxPV: 25,
    maxPP: 20,
    attack: 35,
    defense: 70,
    speed: 45,
    types: [POKEMON_TYPES.ELECTRIQUE],
    evolution: MAGNETON,
    evolutionLevel: 30,
    rank: 1,
    baseSkill: SKILLS.ETINCELLE,
    ppSkill: SKILLS.CAGE_ECLAIR
}