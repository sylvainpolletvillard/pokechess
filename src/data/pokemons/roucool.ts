import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {ROUCOUPS} from "./roucoups";
import {PokemonEntry} from "../pokemons";

export const ROUCOOL: PokemonEntry = {
    ref: "roucool",
    name: "Roucool",
    maxPV: 40,
    maxPP: 20,
    attack: 45,
    defense: 40,
    speed: 56,
    types: [POKEMON_TYPES.VOL, POKEMON_TYPES.NORMAL],
    evolution: ROUCOUPS,
    evolutionLevel: 18,
    rank: 1,
    baseSkill: SKILLS.PICPIC,
    ppSkill: SKILLS.OURAGAN
}