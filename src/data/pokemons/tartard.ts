import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const TARTARD: PokemonEntry = {
    ref: "tartard",
    name: "Tartard",
    maxPV: 90,
    maxPP: 20,
    attack: 95,

    defense: 95,
    speed: 70,
    types: [POKEMON_TYPES.EAU],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES, // torgnoles
    ppSkill: SKILLS.LANCE_SOLEIL // hypnose
}