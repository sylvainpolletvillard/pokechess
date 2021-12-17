import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {NIDORINA} from "./nidorina";
import {PokemonEntry} from "../pokemons";

export const NIDORAN_FEMALE: PokemonEntry = {
    ref: "nidoran_f",
    name: "Nidoran♀",
    maxPV: 55,
    maxPP: 20,
    attack: 47,
    attackRange: 1,
    defense: 52,
    speed: 41,
    types: [POKEMON_TYPES.POISON],
    evolution: NIDORINA,
    evolutionLevel: 16,
    rank: 1,
    baseSkill: SKILLS.GRIFFE,
    ppSkill: SKILLS.LANCE_SOLEIL // crochet venin
}