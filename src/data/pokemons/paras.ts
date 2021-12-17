import {POKEMON_TYPES} from "../types";
import {PARASECT} from "./parasect";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const PARAS: PokemonEntry = {
    ref: "paras",
    name: "Paras",
    maxPV: 35,
    maxPP: 20,
    attack: 70,
    attackRange: 1,
    defense: 55,
    speed: 25,
    types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.PLANTE],
    evolution: PARASECT,
    evolutionLevel: 24,
    rank: 1,
    baseSkill: SKILLS.GRIFFE,
    ppSkill: SKILLS.LANCE_SOLEIL // para-spore
}