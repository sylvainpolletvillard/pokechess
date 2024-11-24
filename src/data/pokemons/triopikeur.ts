import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const TRIOPIKEUR: PokemonEntry = {
	ref: "triopikeur",
	maxPV: 35,
	maxPP: 15,
	attack: 100,
	defense: 50,
	speed: 120,
	types: [POKEMON_TYPES.SOL],
	rank: 2,
	baseSkill: SKILLS.TRIPLATTAQUE,
	ppSkill: SKILLS.TUNNEL,
	wildEncounterChance: 0,
	portraitCropY: 18,
};
