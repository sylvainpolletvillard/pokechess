import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {DARDARGNAN} from "./dardargnan";
import {PokemonEntry} from "../pokemons";

export const COCONFORT: PokemonEntry = {
    ref: "coconfort",
    name: "Coconfort",
    maxPV: 45,
    maxPP: 20,
    attack: 25,
    attackRange: 1,
    defense: 50,
    speed: 35,
    types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.POISON],
    evolution: DARDARGNAN,
    evolutionLevel: 10,
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // dard venin
    ppSkill: SKILLS.LANCE_SOLEIL // armure
}