import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const ECTOPLASMA: PokemonEntry = {
    ref: "ectoplasma",
    name: "Ectoplasma",
    maxPV: 60,
    maxPP: 20,
    attack: 65,
    defense: 60,
    speed: 110,
    types: [POKEMON_TYPES.SPECTRE, POKEMON_TYPES.POISON],
    rank: 3,
    baseSkill: SKILLS.LECHOUILLE,
    ppSkill: SKILLS.DEVOREVE
}