import {POKEMON_TYPES} from "../types";
import {LEVIATOR} from "./leviator";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MAGICARPE: PokemonEntry = {
    ref: "magicarpe",
    name: "Magicarpe",
    maxPV: 20,
    maxPP: 0,
    attack: 10,
    attackRange: 1,
    defense: 55,
    speed: 80,
    types: [POKEMON_TYPES.EAU],
    evolution: LEVIATOR,
    evolutionLevel: 20,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // trempette
}