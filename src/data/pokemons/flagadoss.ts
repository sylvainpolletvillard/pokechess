import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const FLAGADOSS: PokemonEntry = {
    ref: "flagadoss",
    name: "Flagadoss",
    maxPV: 95,
    maxPP: 20,
    attack: 75,
    defense: 110,
    speed: 30,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.PSY],
    rank: 2,
    baseSkill: SKILLS.PISTOLET_A_O,
    ppSkill: SKILLS.AMNESIE,
    wildEncounterChance: 0
}