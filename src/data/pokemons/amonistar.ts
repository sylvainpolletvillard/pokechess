import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const AMONISTAR: PokemonEntry = {
    ref: "amonistar",
    name: "Amonistar",
    maxPV: 70,
    maxPP: 20,
    attack: 60,
    attackRange: 4,
    defense: 125,
    speed: 55,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.ROCHE],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES, // pistolet à eau
    ppSkill: SKILLS.LANCE_SOLEIL // pouvoir antique
}