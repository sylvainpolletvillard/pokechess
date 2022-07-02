import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const AKWAKWAK: PokemonEntry = {
    ref: "akwakwak",
    name: "Akwakwak ",
    maxPV: 80,
    maxPP: 16,
    attack: 82,
    defense: 78,
    speed: 85,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.PSY],
    rank: 2,
    baseSkill: SKILLS.CHOC_MENTAL,
    ppSkill: SKILLS.SURF,
    wildEncounterChance: 0,
    portraitCropY: 14
}