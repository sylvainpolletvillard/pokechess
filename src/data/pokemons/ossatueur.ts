import {POKEMON_TYPES} from "../types";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const OSSATUEUR: PokemonEntry = {
    ref: "ossatueur",
    name: "Ossatueur",
    maxPV: 60,
    maxPP: 20,
    attack: 80,
    defense: 110,
    speed: 45,
    types: [POKEMON_TYPES.SOL],
    rank: 2,
    baseSkill: SKILLS.MASSDOS,
    ppSkill: SKILLS.RUGISSEMENT,
    wildEncounterChance: 0
}