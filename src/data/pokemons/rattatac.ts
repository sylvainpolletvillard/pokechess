import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const RATTATAC: PokemonEntry = {
	ref: "rattatac",
	maxPV: 55,
	maxPP: 20,
	attack: 81,
	defense: 60,
	speed: 97,
	types: [POKEMON_TYPES.NORMAL],
	rank: 2,
	baseSkill: SKILLS.MORSURE,
	ppSkill: SKILLS.CROC_DE_MORT,
	wildEncounterChance: 0,
	portraitCropY: 18,
};
