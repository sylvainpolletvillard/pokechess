import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const AKWAKWAK: PokemonEntry = {
	ref: "akwakwak",
	maxPV: 80,
	maxPP: 16,
	attack: 82,
	defense: 78,
	speed: 85,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.PSY],
	rank: 2,
	baseSkill: SKILLS.CHOC_MENTAL,
	ppSkill: SKILLS.SURF,
	wildEncounterChance: 0,
	portraitCropY: 14,
};
