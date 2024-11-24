import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { GRAVALANCH } from "./gravalanch";

export const RACAILLOU: PokemonEntry = {
	ref: "racaillou",
	maxPV: 40,
	maxPP: 20,
	attack: 80,
	defense: 100,
	speed: 20,
	types: [POKEMON_TYPES.ROCHE, POKEMON_TYPES.SOL],
	evolution: GRAVALANCH,
	evolutionLevel: 25,
	rank: 1,
	baseSkill: SKILLS.JET_PIERRES,
	ppSkill: SKILLS.ARMURE,
	wildEncounterChance: 1,
	portraitCropY: 25,
};
