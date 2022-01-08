import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const LOKHLASS: PokemonEntry = {
    ref: "lokhlass",
    name: "Lokhlass",
    maxPV: 130,
    maxPP: 20,
    attack: 85,
    attackRange: 1,
    defense: 80,
    speed: 60,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.GLACE],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES, // pistoler à O
    ppSkill: SKILLS.LANCE_SOLEIL // surf
}