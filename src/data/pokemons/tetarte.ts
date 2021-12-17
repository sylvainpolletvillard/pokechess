import {POKEMON_TYPES} from "../types";
import {TARTARD} from "./tartard";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const TETARTE: PokemonEntry = {
    ref: "tetarte",
    name: "Tétarte",
    maxPV: 65,
    maxPP: 20,
    attack: 65,
    attackRange: 1,
    defense: 65,
    speed: 90,
    types: [POKEMON_TYPES.EAU],
    evolution: TARTARD,
    evolutionLevel: 35,
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // torgnoles
    ppSkill: SKILLS.LANCE_SOLEIL // hypnose
}