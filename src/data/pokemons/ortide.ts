import {POKEMON_TYPES} from "../types";
import {RAFFLESIA} from "./rafflesia";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ORTIDE: PokemonEntry = {
    ref: "ortide",
    name: "Ortide",
    maxPV: 60,
    maxPP: 20,
    attack: 65,
    attackRange: 1,
    defense: 70,
    speed: 40,
    types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
    evolution: RAFFLESIA,
    evolutionLevel: 37,
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES,  // vol vie
    ppSkill: SKILLS.LANCE_SOLEIL  // poudre toxik
}