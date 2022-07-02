import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const GRODOUDOU: PokemonEntry = {
    ref: "grodoudou",
    name: "Grodoudou",
    maxPV: 140,
    maxPP: 20,
    attack: 70,
    defense: 45,
    speed: 45,
    types: [POKEMON_TYPES.FEE],
    rank: 2,
    baseSkill: SKILLS.TORGNOLES,
    ppSkill: SKILLS.BERCEUSE,
    wildEncounterChance: 0,
    portraitCropY: 14
}