import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const ARTIKODIN: PokemonEntry = {
	ref: "artikodin",
	maxPV: 90,
	maxPP: 30,
	attack: 95,
	defense: 100,
	speed: 85,
	types: [POKEMON_TYPES.VOL, POKEMON_TYPES.GLACE],
	rank: 5,
	baseSkill: SKILLS.POUDREUSE,
	ppSkill: SKILLS.BLIZZARD,
	wildEncounterChance: 0,
	portraitCropY: 7,
};
