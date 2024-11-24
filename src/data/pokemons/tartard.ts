import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const TARTARD: PokemonEntry = {
	ref: "tartard",
	maxPV: 90,
	maxPP: 20,
	attack: 95,
	defense: 95,
	speed: 70,
	types: [POKEMON_TYPES.EAU],
	rank: 3,
	baseSkill: SKILLS.TORGNOLES,
	ppSkill: SKILLS.HYPNOSE,
	wildEncounterChance: 0,
	portraitCropY: 11,
};
