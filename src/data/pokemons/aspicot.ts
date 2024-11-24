import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { COCONFORT } from "./coconfort";

export const ASPICOT: PokemonEntry = {
	ref: "aspicot",
	maxPV: 40,
	maxPP: 20,
	attack: 35,
	defense: 30,
	speed: 50,
	types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.POISON],
	evolution: COCONFORT,
	evolutionLevel: 7,
	rank: 1,
	baseSkill: SKILLS.DARD_VENIN,
	ppSkill: SKILLS.SECRETION,
	wildEncounterChance: 1,
	portraitCropY: 23,
};
