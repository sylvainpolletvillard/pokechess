import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const TYGNON: PokemonEntry = {
	ref: "tygnon",
	maxPV: 50,
	maxPP: 20,
	attack: 105,
	defense: 79,
	speed: 76,
	types: [POKEMON_TYPES.COMBAT],
	rank: 2,
	baseSkill: SKILLS.POING_KARATE,
	ppSkill: SKILLS.ULTIMAPOING,
	wildEncounterChance: 0.75,
};
