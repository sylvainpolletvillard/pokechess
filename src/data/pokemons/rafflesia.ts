import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const RAFFLESIA: PokemonEntry = {
	ref: "rafflesia",
	maxPV: 75,
	maxPP: 20,
	attack: 80,
	defense: 85,
	speed: 50,
	types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
	rank: 3,
	baseSkill: SKILLS.VOL_VIE,
	ppSkill: SKILLS.POUDRE_TOXIK,
	wildEncounterChance: 0,
	portraitCropY: 19,
};
