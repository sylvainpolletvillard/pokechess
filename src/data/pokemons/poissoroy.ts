import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const POISSOROY: PokemonEntry = {
    ref: "poissoroy",
    name: "Poissoroy",
    maxPV: 80,
    maxPP: 20,
    attack: 92,
    defense: 65,
    speed: 68,
    types: [POKEMON_TYPES.EAU],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, //koud'korne
    ppSkill: SKILLS.LANCE_SOLEIL // empal'korne
}