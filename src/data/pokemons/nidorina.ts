import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {NIDOQUEEN} from "./nidoqueen";
import {PokemonEntry} from "../pokemons";

export const NIDORINA: PokemonEntry = {
    ref: "nidorina",
    name: "Nidorina",
    maxPV: 70,
    maxPP: 20,
    attack: 62,
    defense: 67,
    speed: 56,
    types: [POKEMON_TYPES.POISON],
    evolution: NIDOQUEEN,
    evolutionLevel: 32,
    rank: 1,
    baseSkill: SKILLS.DARD_VENIN,
    ppSkill: SKILLS.RUGISSEMENT
}