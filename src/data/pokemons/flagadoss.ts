import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const FLAGADOSS: PokemonEntry = {
    ref: "flagadoss",
    name: "Flagadoss",
    maxPV: 95,
    maxPP: 20,
    attack: 75,
    attackRange: 1,
    defense: 110,
    speed: 30,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.PSY],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // pistolet à eau
    ppSkill: SKILLS.LANCE_SOLEIL // baillement
}