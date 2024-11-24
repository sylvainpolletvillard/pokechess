import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const RONFLEX: PokemonEntry = {
	ref: "ronflex",
	maxPV: 160,
	maxPP: 30,
	attack: 110,
	defense: 65,
	speed: 30,
	types: [POKEMON_TYPES.NORMAL],
	rank: 3,
	baseSkill: SKILLS.CHARGE,
	ppSkill: SKILLS.REPOS,
	wildEncounterChance: 1,
	portraitCropY: 8,
};
