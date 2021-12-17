import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const SABLAIREAU: PokemonEntry = {
    ref: "sablaireau",
    name: "Sablaireau",
    maxPV: 75,
    maxPP: 20,
    attack: 100,
    attackRange: 1,
    defense: 110,
    speed: 65,
    types: [POKEMON_TYPES.SOL],
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // griffe
    ppSkill: SKILLS.LANCE_SOLEIL // jet de sable
}