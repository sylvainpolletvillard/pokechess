import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const RAICHU: PokemonEntry = {
    ref: "raichu",
    name: "Raichu",
    maxPV: 60,
    maxPP: 20,
    attack: 90,

    defense: 55,
    speed: 100,
    types: [POKEMON_TYPES.ELECTRIQUE],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // vive attaque
    ppSkill: SKILLS.LANCE_SOLEIL // éclair
}