import {POKEMON_TYPES} from "../types";
import {FLAGADOSS} from "./flagadoss";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const RAMOLOSS: PokemonEntry = {
    ref: "ramoloss",
    name: "Ramoloss",
    maxPV: 90,
    maxPP: 20,
    attack: 65,
    defense: 65,
    speed: 15,
    types: [POKEMON_TYPES.EAU, POKEMON_TYPES.PSY],
    evolution: FLAGADOSS,
    evolutionLevel: 37,
    rank: 1,
    baseSkill: SKILLS.PISTOLET_A_O,
    ppSkill: SKILLS.AMNESIE,
    wildEncounterChance: 1
}