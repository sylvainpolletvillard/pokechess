import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const PORYGON: PokemonEntry = {
    ref: "porygon",
    name: "Porygon",
    maxPV: 65,
    maxPP: 10,
    attack: 60,
    defense: 70,
    speed: 40,
    types: [POKEMON_TYPES.NORMAL],
    rank: 2,
    baseSkill: SKILLS.CHARGE,
    ppSkill: SKILLS.ADAPTATION
}