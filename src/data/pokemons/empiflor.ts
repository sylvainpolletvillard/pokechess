import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const EMPIFLOR: PokemonEntry = {
    ref: "empiflor",
    name: "Empiflor",
    maxPV: 80,
    maxPP: 20,
    attack: 105,
    defense: 65,
    speed: 70,
    types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES,
    ppSkill: SKILLS.ACIDE
}