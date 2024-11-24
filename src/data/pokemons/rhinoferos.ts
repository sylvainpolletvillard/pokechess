import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const RHINOFEROS: PokemonEntry = {
	ref: "rhinoferos",
	maxPV: 105,
	maxPP: 20,
	attack: 130,
	defense: 120,
	speed: 40,
	types: [POKEMON_TYPES.ROCHE, POKEMON_TYPES.SOL],
	rank: 3,
	baseSkill: SKILLS.KOUD_KORNE,
	ppSkill: SKILLS.EMPAL_KORNE,
	wildEncounterChance: 0,
};
