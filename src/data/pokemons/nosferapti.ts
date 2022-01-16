import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {NOSFERALTO} from "./nosferalto";
import {PokemonEntry} from "../pokemons";

export const NOSFERAPTI: PokemonEntry = {
    ref: "nosferapti",
    name: "Nosferapti",
    maxPV: 40,
    maxPP: 20,
    attack: 45,
    defense: 35,
    speed: 55,
    types: [POKEMON_TYPES.VOL, POKEMON_TYPES.POISON],
    evolution: NOSFERALTO,
    evolutionLevel: 25,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // vampirisme
    ppSkill: SKILLS.LANCE_SOLEIL // ultrason
}