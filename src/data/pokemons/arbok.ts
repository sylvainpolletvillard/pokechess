import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ARBOK: PokemonEntry = {
    ref: "arbok",
    name: "Arbok",
    maxPV: 60,
    maxPP: 20,
    attack: 95,
    defense: 69,
    speed: 65,
    types: [POKEMON_TYPES.POISON],
    rank: 2,
    baseSkill: SKILLS.MORSURE,
    ppSkill: SKILLS.LANCE_SOLEIL // ligotage
}