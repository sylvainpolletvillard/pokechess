import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const RAPASDEPIC: PokemonEntry = {
    ref: "rapasdepic",
    name: "Rapasdepic",
    maxPV: 65,
    maxPP: 10,
    attack: 90,
    defense: 65,
    speed: 100,
    types: [POKEMON_TYPES.VOL, POKEMON_TYPES.NORMAL],
    rank: 2,
    baseSkill: SKILLS.CRUAILE,
    ppSkill: SKILLS.HATE,
    wildEncounterChance: 0
}