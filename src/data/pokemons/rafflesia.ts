import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const RAFFLESIA: PokemonEntry = {
    ref: "rafflesia",
    name: "Rafflesia",
    maxPV: 75,
    maxPP: 20,
    attack: 80,
    attackRange: 1,
    defense: 85,
    speed: 50,
    types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES,  // vol vie
    ppSkill: SKILLS.LANCE_SOLEIL  // poudre toxik
}