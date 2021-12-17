import {POKEMON_TYPES} from "../types";
import {CHRYSACIER} from "./chrysacier";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const CHENIPAN: PokemonEntry = {
    ref: "chenipan",
    name: "Chenipan",
    maxPV: 45,
    maxPP: 20,
    attack: 30,
    attackRange: 1,
    defense: 35,
    speed: 45,
    types: [POKEMON_TYPES.INSECTE],
    evolution: CHRYSACIER,
    evolutionLevel: 7,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES,
    ppSkill: SKILLS.LANCE_SOLEIL
}