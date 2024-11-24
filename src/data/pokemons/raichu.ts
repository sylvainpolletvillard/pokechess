import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const RAICHU: PokemonEntry = {
	ref: "raichu",
	maxPV: 60,
	maxPP: 30,
	attack: 90,
	defense: 55,
	speed: 100,
	types: [POKEMON_TYPES.ELECTRIQUE],
	rank: 2,
	baseSkill: SKILLS.VIVE_ATTAQUE,
	ppSkill: SKILLS.ECLAIR,
	wildEncounterChance: 0,
};
