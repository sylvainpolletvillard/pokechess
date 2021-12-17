import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const CRUSTABRI: PokemonEntry = {
    ref: "crustabri",
    name: "Crustabri",
    maxPV: 50,
    maxPP: 20,
    attack: 95,
    attackRange: 1,
    defense: 180,
    speed: 70,
    types: [POKEMON_TYPES.EAU],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES, // pistolet à eau
    ppSkill: SKILLS.LANCE_SOLEIL // abri
}