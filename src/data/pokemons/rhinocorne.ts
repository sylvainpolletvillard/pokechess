import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { RHINOFEROS } from "./rhinoferos";

export const RHINOCORNE: PokemonEntry = {
	ref: "rhinocorne",
	maxPV: 80,
	maxPP: 20,
	attack: 85,
	defense: 95,
	speed: 25,
	types: [POKEMON_TYPES.ROCHE, POKEMON_TYPES.SOL],
	evolution: RHINOFEROS,
	evolutionLevel: 42,
	rank: 1,
	baseSkill: SKILLS.KOUD_KORNE,
	ppSkill: SKILLS.EMPAL_KORNE,
	wildEncounterChance: 1,
	portraitCropY: 32,
};
