import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const POISSOROY: PokemonEntry = {
	ref: "poissoroy",
	maxPV: 80,
	maxPP: 20,
	attack: 92,
	defense: 65,
	speed: 68,
	types: [POKEMON_TYPES.EAU],
	rank: 2,
	baseSkill: SKILLS.KOUD_KORNE,
	ppSkill: SKILLS.CASCADE,
	wildEncounterChance: 0,
	portraitCropY: 14,
};
