import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {GRODOUDOU} from "./grodoudou";
import {PokemonEntry} from "../pokemons";

export const RONDOUDOU: PokemonEntry = {
    ref: "rondoudou",
    name: "Rondoudou",
    maxPV: 115,
    maxPP: 20,
    attack: 45,
    defense: 20,
    speed: 20,
    types: [POKEMON_TYPES.FEE],
    evolution: GRODOUDOU,
    evolutionLevel: 25,
    rank: 1,
    baseSkill: SKILLS.TORGNOLES,
    ppSkill: SKILLS.BERCEUSE,
    wildEncounterChance: 1
}