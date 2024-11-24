import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const AMONISTAR: PokemonEntry = {
	ref: "amonistar",
	maxPV: 70,
	maxPP: 20,
	attack: 60,
	defense: 125,
	speed: 55,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.ROCHE],
	rank: 3,
	baseSkill: SKILLS.PISTOLET_A_O,
	ppSkill: SKILLS.POUVOIR_ANTIQUE,
	wildEncounterChance: 0,
	portraitCropY: 26,
};
