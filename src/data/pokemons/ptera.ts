import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const PTERA: PokemonEntry = {
	ref: "ptera",
	maxPV: 80,
	maxPP: 20,
	attack: 105,
	defense: 65,
	speed: 130,
	types: [POKEMON_TYPES.DRAGON, POKEMON_TYPES.ROCHE],
	rank: 3,
	baseSkill: SKILLS.CRUAILE,
	ppSkill: SKILLS.POUVOIR_ANTIQUE,
	wildEncounterChance: 0.1,
	portraitCropY: 22,
};
