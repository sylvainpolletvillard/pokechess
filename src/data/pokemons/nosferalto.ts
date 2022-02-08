import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const NOSFERALTO: PokemonEntry = {
    ref: "nosferalto",
    name: "Nosferalto",
    maxPV: 75,
    maxPP: 20,
    attack: 80,
    defense: 70,
    speed: 90,
    types: [POKEMON_TYPES.VOL, POKEMON_TYPES.POISON],
    rank: 2,
    baseSkill: SKILLS.VAMPIRISME,
    ppSkill: SKILLS.ULTRASON
}