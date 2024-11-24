import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const SABLAIREAU: PokemonEntry = {
	ref: "sablaireau",
	maxPV: 75,
	maxPP: 15,
	attack: 100,
	defense: 110,
	speed: 65,
	types: [POKEMON_TYPES.SOL],
	rank: 2,
	baseSkill: SKILLS.GRIFFE,
	ppSkill: SKILLS.JET_DE_SABLE,
	wildEncounterChance: 0,
	portraitCropY: 15,
};
