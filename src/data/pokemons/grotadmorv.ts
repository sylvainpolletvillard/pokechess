import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const GROTADMORV: PokemonEntry = {
    ref: "grotadmorv",
    name: "Grotadmorv",
    maxPV: 105,
    maxPP: 20,
    attack: 105,
    defense: 75,
    speed: 50,
    types: [POKEMON_TYPES.POISON],
    rank: 2,
    baseSkill: SKILLS.COUD_BOUE,
    ppSkill: SKILLS.LANCE_SOLEIL // Bomb beurk
}