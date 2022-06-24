import {POKEMON_TYPES} from "../types";
import {GRAVALANCH} from "./gravalanch";
import {SKILLS} from "../skills";
import {PokemonEntry} from "../pokemons";

export const RACAILLOU: PokemonEntry = {
    ref: "racaillou",
    name: "Racaillou",
    maxPV: 40,
    maxPP: 20,
    attack: 80,
    defense: 100,
    speed: 20,
    types: [POKEMON_TYPES.ROCHE, POKEMON_TYPES.SOL],
    evolution: GRAVALANCH,
    evolutionLevel: 25,
    rank: 1,
    baseSkill: SKILLS.JET_PIERRES,
    ppSkill: SKILLS.ARMURE,
    wildEncounterChance: 1
}