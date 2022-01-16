import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const NIDOKING: PokemonEntry = {
    ref: "nidoking",
    name: "Nidoking",
    maxPV: 81,
    maxPP: 20,
    attack: 102,
    defense: 77,
    speed: 85,
    types: [POKEMON_TYPES.POISON, POKEMON_TYPES.SOL],
    rank: 1,
    baseSkill: SKILLS.GRIFFE, // dard venin
    ppSkill: SKILLS.LANCE_SOLEIL // Empal'Korne
}