import {POKEMON_TYPES} from "../types";
import {STAROSS} from "./staross";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const STARI: PokemonEntry = {
    ref: "stari",
    name: "Stari",
    maxPV: 30,
    maxPP: 20,
    attack: 45,

    defense: 55,
    speed: 85,
    types: [POKEMON_TYPES.EAU],
    evolution: STAROSS,
    evolutionLevel: 40,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // pistolet à eau
    ppSkill: SKILLS.LANCE_SOLEIL // météores
}