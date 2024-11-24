import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const STAROSS: PokemonEntry = {
	ref: "staross",
	maxPV: 60,
	maxPP: 20,
	attack: 75,
	defense: 85,
	speed: 115,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.PSY],
	rank: 3,
	baseSkill: SKILLS.PISTOLET_A_O,
	ppSkill: SKILLS.METEORES,
	wildEncounterChance: 0,
};
