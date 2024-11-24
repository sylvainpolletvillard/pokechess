import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { AMONISTAR } from "./amonistar";

export const AMONITA: PokemonEntry = {
	ref: "amonita",
	maxPV: 35,
	maxPP: 20,
	attack: 40,
	defense: 100,
	speed: 35,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.ROCHE],
	evolution: AMONISTAR,
	evolutionLevel: 40,
	rank: 1,
	baseSkill: SKILLS.PISTOLET_A_O,
	ppSkill: SKILLS.POUVOIR_ANTIQUE,
	wildEncounterChance: 0.1,
	portraitCropY: 25,
};
