import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const ROUCARNAGE: PokemonEntry = {
	ref: "roucarnage",
	maxPV: 83,
	maxPP: 20,
	attack: 80,
	defense: 75,
	speed: 91,
	types: [POKEMON_TYPES.VOL, POKEMON_TYPES.NORMAL],
	rank: 3,
	baseSkill: SKILLS.CRUAILE,
	ppSkill: SKILLS.OURAGAN,
	wildEncounterChance: 0,
};
