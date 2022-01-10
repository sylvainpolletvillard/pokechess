import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {RAICHU} from "./raichu";
import {PokemonEntry} from "../pokemons";

export const PIKACHU: PokemonEntry = {
    ref: "pikachu",
    name: "Pikachu",
    maxPV: 35,
    maxPP: 20,
    attack: 55,

    defense: 40,
    speed: 90,
    types: [POKEMON_TYPES.ELECTRIQUE],
    evolution: RAICHU,
    evolutionLevel: 22,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // vive attaque
    ppSkill: SKILLS.LANCE_SOLEIL // éclair
}