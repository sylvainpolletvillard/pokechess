import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { SABLAIREAU } from "./sablaireau";

export const SABELETTE: PokemonEntry = {
	ref: "sabelette",
	maxPV: 50,
	maxPP: 15,
	attack: 75,
	defense: 85,
	speed: 40,
	types: [POKEMON_TYPES.SOL],
	evolution: SABLAIREAU,
	evolutionLevel: 22,
	rank: 1,
	baseSkill: SKILLS.GRIFFE,
	ppSkill: SKILLS.JET_DE_SABLE,
	wildEncounterChance: 1,
};
