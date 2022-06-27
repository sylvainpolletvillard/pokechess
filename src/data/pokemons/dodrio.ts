import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const DODRIO: PokemonEntry = {
    ref: "dodrio",
    name: "Dodrio",
    maxPV: 60,
    maxPP: 10,
    attack: 110,
    defense: 70,
    speed: 110,
    types: [POKEMON_TYPES.NORMAL, POKEMON_TYPES.VOL],
    rank: 2,
    baseSkill: SKILLS.TRIPLATTAQUE,
    ppSkill: SKILLS.FURIE,
    wildEncounterChance: 0
}