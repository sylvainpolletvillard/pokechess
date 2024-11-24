import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { STAROSS } from "./staross";

export const STARI: PokemonEntry = {
	ref: "stari",
	maxPV: 30,
	maxPP: 10,
	attack: 45,
	defense: 55,
	speed: 85,
	types: [POKEMON_TYPES.EAU],
	evolution: STAROSS,
	evolutionLevel: 40,
	rank: 1,
	baseSkill: SKILLS.PISTOLET_A_O,
	ppSkill: SKILLS.METEORES,
	wildEncounterChance: 1,
	portraitCropY: 22,
};
