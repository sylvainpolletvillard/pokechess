import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const MEW: PokemonEntry = {
    ref: "mew",
    name: "Mew",
    maxPV: 100,
    maxPP: 5,
    attack: 100,
    defense: 100,
    speed: 100,
    types: [POKEMON_TYPES.PSY],
    rank: 5,
    baseSkill: SKILLS.CHOC_MENTAL,
    ppSkill: SKILLS.METRONOME
}