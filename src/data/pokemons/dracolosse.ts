import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const DRACOLOSSE: PokemonEntry = {
	ref: "dracolosse",
	maxPV: 91,
	maxPP: 20,
	attack: 134,
	defense: 95,
	speed: 80,
	types: [POKEMON_TYPES.DRAGON, POKEMON_TYPES.VOL],
	rank: 3,
	baseSkill: SKILLS.CRUAILE,
	ppSkill: SKILLS.ULTRALASER,
	wildEncounterChance: 0,
	portraitCropY: 1,
};
