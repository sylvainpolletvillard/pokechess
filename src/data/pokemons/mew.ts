import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MEW: PokemonEntry = {
    ref: "mew",
    name: "Mew",
    maxPV: 100,
    maxPP: 20,
    attack: 100,
    attackRange: 4,
    defense: 100,
    speed: 100,
    types: [POKEMON_TYPES.PSY],
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // choc mental
    ppSkill: SKILLS.LANCE_SOLEIL // métronome
}