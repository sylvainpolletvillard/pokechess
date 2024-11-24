import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const SAQUEDENEU: PokemonEntry = {
	ref: "saquedeneu",
	maxPV: 65,
	maxPP: 20,
	attack: 55,
	defense: 115,
	speed: 60,
	types: [POKEMON_TYPES.PLANTE],
	rank: 3,
	baseSkill: SKILLS.FOUET_LIANES,
	ppSkill: SKILLS.LIGOTAGE,
	wildEncounterChance: 1,
	portraitCropY: 22,
};
