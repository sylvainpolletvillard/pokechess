import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ROUCARNAGE: PokemonEntry = {
    ref: "roucarnage",
    name: "Roucarnage",
    maxPV: 83,
    maxPP: 20,
    attack: 80,
    defense: 75,
    speed: 91,
    types: [POKEMON_TYPES.VOL, POKEMON_TYPES.NORMAL],
    rank: 3,
    baseSkill: SKILLS.CRUAILE,
    ppSkill: SKILLS.LANCE_SOLEIL // tornade
}