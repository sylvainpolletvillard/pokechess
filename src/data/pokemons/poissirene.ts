import {POKEMON_TYPES} from "../types";
import {POISSOROY} from "./poissoroy";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const POISSIRENE: PokemonEntry = {
    ref: "poissirene",
    name: "Poissirène",
    maxPV: 45,
    maxPP: 20,
    attack: 67,
    attackRange: 1,
    defense: 60,
    speed: 63,
    types: [POKEMON_TYPES.EAU],
    evolution: POISSOROY,
    evolutionLevel: 33,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, //koud'korne
    ppSkill: SKILLS.LANCE_SOLEIL // empal'korne
}