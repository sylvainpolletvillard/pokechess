import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { TARTARD } from "./tartard";

export const TETARTE: PokemonEntry = {
	ref: "tetarte",
	maxPV: 65,
	maxPP: 20,
	attack: 65,
	defense: 65,
	speed: 90,
	types: [POKEMON_TYPES.EAU],
	evolution: TARTARD,
	evolutionLevel: 35,
	rank: 2,
	baseSkill: SKILLS.TORGNOLES,
	ppSkill: SKILLS.HYPNOSE,
	wildEncounterChance: 0,
	portraitCropY: 13,
};
