import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ELECTHOR: PokemonEntry = {
    ref: "electhor",
    name: "Electhor",
    maxPV: 90,
    maxPP: 20,
    attack: 90,
    defense: 85,
    speed: 100,
    types: [POKEMON_TYPES.VOL, POKEMON_TYPES.ELECTRIQUE],
    rank: 5,
    baseSkill: SKILLS.ETINCELLE,
    ppSkill: SKILLS.LANCE_SOLEIL // fatal foudre
}