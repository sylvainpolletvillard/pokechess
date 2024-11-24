import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const PARASECT: PokemonEntry = {
	ref: "parasect",
	maxPV: 60,
	maxPP: 20,
	attack: 95,
	defense: 80,
	speed: 30,
	types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.PLANTE],
	rank: 2,
	baseSkill: SKILLS.GRIFFE,
	ppSkill: SKILLS.PARASPORE,
	wildEncounterChance: 0,
	portraitCropY: 24,
};
