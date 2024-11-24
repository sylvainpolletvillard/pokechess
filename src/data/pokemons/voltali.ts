import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { EVOLI } from "./evoli";

export const VOLTALI: PokemonEntry = {
	ref: "voltali",
	maxPV: 65,
	maxPP: 20,
	attack: 65,
	defense: 60,
	speed: 130,
	types: [POKEMON_TYPES.ELECTRIQUE],
	devolution: EVOLI,
	rank: 2,
	baseSkill: SKILLS.ETINCELLE,
	ppSkill: SKILLS.ECLAIR,
	wildEncounterChance: 1,
	portraitCropY: 21,
};
