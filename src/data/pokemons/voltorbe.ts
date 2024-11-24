import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { ELECTRODE } from "./electrode";

export const VOLTORBE: PokemonEntry = {
	ref: "voltorbe",
	maxPV: 40,
	maxPP: 50,
	attack: 30,
	defense: 50,
	speed: 100,
	types: [POKEMON_TYPES.ELECTRIQUE],
	evolution: ELECTRODE,
	evolutionLevel: 22,
	rank: 1,
	baseSkill: SKILLS.CHARGE,
	ppSkill: SKILLS.DESTRUCTION,
	wildEncounterChance: 1,
	portraitCropY: 23,
};
