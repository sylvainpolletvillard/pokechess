import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const PORYGON: PokemonEntry = {
	ref: "porygon",
	maxPV: 65,
	maxPP: 20,
	attack: 60,
	defense: 70,
	speed: 40,
	types: [POKEMON_TYPES.NORMAL],
	rank: 2,
	baseSkill: SKILLS.TRIPLATTAQUE,
	ppSkill: SKILLS.ADAPTATION,
	wildEncounterChance: 1,
	portraitCropY: 15,
};
