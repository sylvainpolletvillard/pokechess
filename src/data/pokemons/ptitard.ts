import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { TETARTE } from "./tetarte";

export const PTITARD: PokemonEntry = {
	ref: "ptitard",
	maxPV: 40,
	maxPP: 20,
	attack: 50,
	defense: 40,
	speed: 90,
	types: [POKEMON_TYPES.EAU],
	evolution: TETARTE,
	evolutionLevel: 25,
	rank: 1,
	baseSkill: SKILLS.BULLES_D_O,
	ppSkill: SKILLS.HYPNOSE,
	wildEncounterChance: 1,
};
