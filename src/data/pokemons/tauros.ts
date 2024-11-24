import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const TAUROS: PokemonEntry = {
	ref: "tauros",
	maxPV: 75,
	maxPP: 20,
	attack: 100,
	defense: 95,
	speed: 110,
	types: [POKEMON_TYPES.NORMAL],
	rank: 2,
	baseSkill: SKILLS.CHARGE,
	ppSkill: SKILLS.BELIER,
	wildEncounterChance: 1,
	portraitCropY: 22,
};
