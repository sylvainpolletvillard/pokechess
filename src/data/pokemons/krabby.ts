import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { KRABBOSS } from "./krabboss";

export const KRABBY: PokemonEntry = {
	ref: "krabby",
	maxPV: 30,
	maxPP: 30,
	attack: 105,
	defense: 90,
	speed: 50,
	types: [POKEMON_TYPES.EAU],
	evolution: KRABBOSS,
	evolutionLevel: 28,
	rank: 1,
	baseSkill: SKILLS.PINCE_MASSE,
	ppSkill: SKILLS.GUILLOTINE,
	wildEncounterChance: 1,
	portraitCropY: 18,
};
