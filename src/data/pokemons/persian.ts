import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const PERSIAN: PokemonEntry = {
	ref: "persian",
	maxPV: 65,
	maxPP: 20,
	attack: 70,
	defense: 60,
	speed: 115,
	types: [POKEMON_TYPES.NORMAL],
	rank: 1,
	baseSkill: SKILLS.GRIFFE,
	ppSkill: SKILLS.JACKPOT,
	wildEncounterChance: 0,
	portraitCropY: 12,
};
