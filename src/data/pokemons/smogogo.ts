import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const SMOGOGO: PokemonEntry = {
	ref: "smogogo",
	maxPV: 65,
	maxPP: 20,
	attack: 90,
	defense: 120,
	speed: 60,
	types: [POKEMON_TYPES.POISON],
	rank: 2,
	baseSkill: SKILLS.DETRITUS,
	ppSkill: SKILLS.BROUILLARD,
	wildEncounterChance: 0,
};
