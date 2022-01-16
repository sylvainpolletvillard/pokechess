import {POKEMON_TYPES} from "../types";
import {SPECTRUM} from "./spectrum";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const FANTOMINUS: PokemonEntry = {
    ref: "fantominus",
    name: "Fantominus",
    maxPV: 30,
    maxPP: 20,
    attack: 35,
    defense: 30,
    speed: 80,
    types: [POKEMON_TYPES.SPECTRE, POKEMON_TYPES.POISON],
    evolution: SPECTRUM,
    evolutionLevel: 25,
    rank: 1,
    baseSkill: SKILLS.FOUET_LIANES, // léchouille
    ppSkill: SKILLS.LANCE_SOLEIL // dévoreve
}