import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { NIDORINA } from "./nidorina";

export const NIDORAN_FEMALE: PokemonEntry = {
	ref: "nidoranf",
	maxPV: 55,
	maxPP: 20,
	attack: 47,
	defense: 52,
	speed: 41,
	types: [POKEMON_TYPES.POISON],
	evolution: NIDORINA,
	evolutionLevel: 16,
	rank: 1,
	baseSkill: SKILLS.GRIFFE,
	ppSkill: SKILLS.RUGISSEMENT,
	wildEncounterChance: 1,
};
