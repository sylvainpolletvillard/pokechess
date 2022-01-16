import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MAGNETON: PokemonEntry = {
    ref: "magneton",
    name: "Magneton",
    maxPV: 50,
    maxPP: 20,
    attack: 60,
    defense: 95,
    speed: 70,
    types: [POKEMON_TYPES.ELECTRIQUE],
    rank: 2,
    baseSkill: SKILLS.ETINCELLE,
    ppSkill: SKILLS.CAGE_ECLAIR
}