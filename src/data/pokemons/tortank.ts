import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const TORTANK: PokemonEntry = {
	ref: "tortank",
	maxPV: 79,
	maxPP: 20,
	attack: 83,
	defense: 80,
	speed: 58,
	types: [POKEMON_TYPES.EAU],
	rank: 3,
	baseSkill: SKILLS.PISTOLET_A_O,
	ppSkill: SKILLS.HYDROCANON,
	wildEncounterChance: 0,
	portraitCropY: 8,
};
