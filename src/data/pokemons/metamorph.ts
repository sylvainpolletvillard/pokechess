import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const METAMORPH: PokemonEntry = {
    ref: "metamorph",
    name: "Metamorph",
    maxPV: 48,
    maxPP: 0,
    attack: 48,
    defense: 48,
    speed: 48,
    types: [POKEMON_TYPES.NORMAL],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // morphing
}