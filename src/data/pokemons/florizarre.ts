import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const FLORIZARRE: PokemonEntry = {
    ref: "florizarre",
    name: "Florizarre",
    maxPV: 80,
    maxPP: 20,
    attack: 82,
    defense: 83,
    speed: 80,
    types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES,
    ppSkill: SKILLS.LANCE_SOLEIL
}