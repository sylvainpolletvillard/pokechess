import {POKEMON_TYPES} from "../types";
import {SPECTRUM} from "./spectrum";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const FANTOMINUS: PokemonEntry = {
    ref: "fantominus",
    name: "Fantominus",
    maxPV: 30,
    maxPP: 16,
    attack: 35,
    defense: 30,
    speed: 80,
    types: [POKEMON_TYPES.SPECTRE, POKEMON_TYPES.POISON],
    evolution: SPECTRUM,
    evolutionLevel: 25,
    rank: 1,
    baseSkill: SKILLS.LECHOUILLE,
    ppSkill: SKILLS.DEVOREVE,
    wildEncounterChance: 1,
    portraitCropY: 26
}