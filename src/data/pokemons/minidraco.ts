import {POKEMON_TYPES} from "../types";
import {DRACO} from "./draco";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MINIDRACO: PokemonEntry = {
    ref: "minidraco",
    name: "Minidraco",
    maxPV: 41,
    maxPP: 20,
    attack: 64,
    defense: 45,
    speed: 50,
    types: [POKEMON_TYPES.DRAGON],
    evolution: DRACO,
    evolutionLevel: 30,
    rank: 1,
    baseSkill: SKILLS.DRACOCHARGE,
    ppSkill: SKILLS.OURAGAN
}