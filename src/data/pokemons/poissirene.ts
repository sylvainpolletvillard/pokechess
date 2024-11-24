import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { POISSOROY } from "./poissoroy";

export const POISSIRENE: PokemonEntry = {
	ref: "poissirene",
	maxPV: 45,
	maxPP: 20,
	attack: 67,
	defense: 60,
	speed: 63,
	types: [POKEMON_TYPES.EAU],
	evolution: POISSOROY,
	evolutionLevel: 33,
	rank: 1,
	baseSkill: SKILLS.KOUD_KORNE,
	ppSkill: SKILLS.CASCADE,
	wildEncounterChance: 1,
	portraitCropY: 27,
};
