import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { ARBOK } from "./arbok";

export const ABO: PokemonEntry = {
	ref: "abo",
	maxPV: 35,
	maxPP: 20,
	attack: 60,
	defense: 44,
	speed: 55,
	types: [POKEMON_TYPES.POISON],
	evolution: ARBOK,
	evolutionLevel: 22,
	rank: 1,
	baseSkill: SKILLS.CROCHET_VENIN,
	ppSkill: SKILLS.LIGOTAGE,
	wildEncounterChance: 1,
	portraitCropY: 14,
};
