import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { SMOGOGO } from "./smogogo";

export const SMOGO: PokemonEntry = {
	ref: "smogo",
	maxPV: 40,
	maxPP: 20,
	attack: 65,
	defense: 95,
	speed: 35,
	types: [POKEMON_TYPES.POISON],
	evolution: SMOGOGO,
	evolutionLevel: 35,
	rank: 1,
	baseSkill: SKILLS.DETRITUS,
	ppSkill: SKILLS.BROUILLARD,
	wildEncounterChance: 1,
};
