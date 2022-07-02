import {POKEMON_TYPES} from "../types";
import {AMONISTAR} from "./amonistar";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const AMONITA: PokemonEntry = {
    ref: "amonita",
    name: "Amonita",
    maxPV: 35,
    maxPP: 20,
    attack: 40,
    defense: 100,
    speed: 35,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.ROCHE],
    evolution: AMONISTAR,
    evolutionLevel: 40,
    rank: 1,
    baseSkill: SKILLS.PISTOLET_A_O,
    ppSkill: SKILLS.POUVOIR_ANTIQUE,
    wildEncounterChance: 0.1,
    portraitCropY: 25
}