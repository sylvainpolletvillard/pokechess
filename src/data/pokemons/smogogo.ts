import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const SMOGOGO: PokemonEntry = {
    ref: "smogogo",
    name: "Smogogo",
    maxPV: 65,
    maxPP: 20,
    attack: 90,
    defense: 120,
    speed: 60,
    types: [POKEMON_TYPES.POISON],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // détritus
    ppSkill: SKILLS.LANCE_SOLEIL // brouillard
}