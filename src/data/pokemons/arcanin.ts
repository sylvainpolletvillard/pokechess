import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const ARCANIN: PokemonEntry = {
	ref: "arcanin",
	maxPV: 90,
	maxPP: 20,
	attack: 110,
	defense: 80,
	speed: 95,
	types: [POKEMON_TYPES.FEU],
	rank: 2,
	baseSkill: SKILLS.MORSURE,
	ppSkill: SKILLS.CROCS_FEU,
	wildEncounterChance: 0,
	portraitCropY: 10,
};
