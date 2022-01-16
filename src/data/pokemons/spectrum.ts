import {POKEMON_TYPES} from "../types";
import {ECTOPLASMA} from "./ectoplasma";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const SPECTRUM: PokemonEntry = {
    ref: "spectrum",
    name: "Spectrum",
    maxPV: 45,
    maxPP: 20,
    attack: 50,
    defense: 45,
    speed: 95,
    types: [POKEMON_TYPES.SPECTRE, POKEMON_TYPES.POISON],
    evolution: ECTOPLASMA,
    evolutionLevel: 40,
    rank: 2,
    baseSkill: SKILLS.FOUET_LIANES, // léchouille
    ppSkill: SKILLS.LANCE_SOLEIL // dévoreve
}