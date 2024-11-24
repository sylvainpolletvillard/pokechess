import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { AKWAKWAK } from "./akwakwak";

export const PSYKOKWAK: PokemonEntry = {
	ref: "psykokwak",
	maxPV: 50,
	maxPP: 16,
	attack: 52,
	defense: 48,
	speed: 55,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.PSY],
	evolution: AKWAKWAK,
	evolutionLevel: 33,
	rank: 1,
	baseSkill: SKILLS.CHOC_MENTAL,
	ppSkill: SKILLS.SURF,
	wildEncounterChance: 1,
};
