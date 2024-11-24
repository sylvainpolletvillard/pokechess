import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { PARASECT } from "./parasect";

export const PARAS: PokemonEntry = {
	ref: "paras",
	maxPV: 35,
	maxPP: 20,
	attack: 70,
	defense: 55,
	speed: 25,
	types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.PLANTE],
	evolution: PARASECT,
	evolutionLevel: 24,
	rank: 1,
	baseSkill: SKILLS.GRIFFE,
	ppSkill: SKILLS.PARASPORE,
	wildEncounterChance: 1,
	portraitCropY: 21,
};
