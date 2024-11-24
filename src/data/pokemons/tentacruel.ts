import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const TENTACRUEL: PokemonEntry = {
	ref: "tentacruel",
	maxPV: 80,
	maxPP: 20,
	attack: 70,
	defense: 65,
	speed: 100,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.POISON],
	rank: 2,
	baseSkill: SKILLS.DARD_VENIN,
	ppSkill: SKILLS.ACIDE,
	wildEncounterChance: 0,
};
