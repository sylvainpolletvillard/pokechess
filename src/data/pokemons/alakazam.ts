import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ALAKAZAM: PokemonEntry = {
    ref: "alakazam",
    name: "Alakazam",
    maxPV: 55,
    maxPP: 20,
    attack: 40,
    defense: 45,
    speed: 120,
    types: [POKEMON_TYPES.PSY],
    rank: 3,
    baseSkill: SKILLS.FOUET_LIANES, // choc mental
    ppSkill: SKILLS.LANCE_SOLEIL // teleport
}