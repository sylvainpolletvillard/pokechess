import {POKEMON_TYPES} from "../types";
import {MACHOPEUR} from "./machopeur";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MACHOC: PokemonEntry = {
    ref: "machoc",
    name: "Machoc",
    maxPV: 70,
    maxPP: 20,
    attack: 80,
    defense: 50,
    speed: 35,
    types: [POKEMON_TYPES.COMBAT],
    evolution: MACHOPEUR,
    evolutionLevel: 28,
    rank: 1,
    baseSkill: SKILLS.POING_KARATE,
    ppSkill: SKILLS.BALAYAGE,
    wildEncounterChance: 1
}