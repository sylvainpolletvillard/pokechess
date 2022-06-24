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
    defense: 50,
    speed: 35,
    types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.POISON],
    evolution: DARDARGNAN,
    evolutionLevel: 10,
    rank: 2,
    baseSkill: SKILLS.DARD_VENIN,
    ppSkill: SKILLS.ARMURE,
    wildEncounterChance: 0
}