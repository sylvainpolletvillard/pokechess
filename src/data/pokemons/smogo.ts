import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {SMOGOGO} from "./smogogo";
import {PokemonEntry} from "../pokemons";

export const SMOGO: PokemonEntry = {
    ref: "smogo",
    name: "Smogo",
    maxPV: 40,
    maxPP: 20,
    attack: 65,

    defense: 95,
    speed: 35,
    types: [POKEMON_TYPES.POISON],
    evolution: SMOGOGO,
    evolutionLevel: 35,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // détritus
    ppSkill: SKILLS.LANCE_SOLEIL // brouillard
}