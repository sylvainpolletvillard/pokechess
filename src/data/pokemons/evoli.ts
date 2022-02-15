import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const EVOLI: PokemonEntry = {
    ref: "evoli",
    name: "Evoli",
    maxPV: 55,
    maxPP: 10,
    attack: 55,
    defense: 50,
    speed: 55,
    types: [POKEMON_TYPES.NORMAL],
    rank: 1,
    baseSkill: SKILLS.CHARGE,
    ppSkill: SKILLS.EVOLUTION
}