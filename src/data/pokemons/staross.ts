import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const STAROSS: PokemonEntry = {
    ref: "staross",
    name: "Staross",
    maxPV: 60,
    maxPP: 20,
    attack: 75,
    attackRange: 4,
    defense: 85,
    speed: 115,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.PSY],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES, // pistolet à eau
    ppSkill: SKILLS.LANCE_SOLEIL // psyko
}