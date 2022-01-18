import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {NIDOKING} from "./nidoking";
import {PokemonEntry} from "../pokemons";

export const NIDORINO: PokemonEntry = {
    ref: "nidorino",
    name: "Nidorino",
    maxPV: 61,
    maxPP: 20,
    attack: 72,
    defense: 57,
    speed: 65,
    types: [POKEMON_TYPES.POISON],
    evolution: NIDOKING,
    evolutionLevel: 32,
    rank: 1,
    baseSkill: SKILLS.DARD_VENIN,
    ppSkill: SKILLS.LANCE_SOLEIL // koud'korne
}