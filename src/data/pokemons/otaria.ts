import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { LAMANTINE } from "./lamantine";

export const OTARIA: PokemonEntry = {
	ref: "otaria",
	maxPV: 65,
	maxPP: 20,
	attack: 45,
	defense: 55,
	speed: 45,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.GLACE],
	evolution: LAMANTINE,
	evolutionLevel: 34,
	rank: 1,
	baseSkill: SKILLS.POUDREUSE,
	ppSkill: SKILLS.LASER_GLACE,
	wildEncounterChance: 1,
	portraitCropY: 34,
};
