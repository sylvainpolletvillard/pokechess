import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const RAPASDEPIC: PokemonEntry = {
	ref: "rapasdepic",
	maxPV: 65,
	maxPP: 10,
	attack: 90,
	defense: 65,
	speed: 100,
	types: [POKEMON_TYPES.VOL, POKEMON_TYPES.NORMAL],
	rank: 2,
	baseSkill: SKILLS.CRUAILE,
	ppSkill: SKILLS.HATE,
	wildEncounterChance: 0,
	portraitCropY: 30,
};
