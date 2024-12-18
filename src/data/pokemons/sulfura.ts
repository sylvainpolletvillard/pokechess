import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const SULFURA: PokemonEntry = {
	ref: "sulfura",
	maxPV: 90,
	maxPP: 30,
	attack: 100,
	defense: 90,
	speed: 90,
	types: [POKEMON_TYPES.VOL, POKEMON_TYPES.FEU],
	rank: 5,
	baseSkill: SKILLS.FLAMMECHE,
	ppSkill: SKILLS.DEFLAGRATION,
	wildEncounterChance: 0,
	portraitCropY: 31,
};
