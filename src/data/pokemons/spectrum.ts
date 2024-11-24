import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { ECTOPLASMA } from "./ectoplasma";

export const SPECTRUM: PokemonEntry = {
	ref: "spectrum",
	maxPV: 45,
	maxPP: 16,
	attack: 50,
	defense: 45,
	speed: 95,
	types: [POKEMON_TYPES.SPECTRE, POKEMON_TYPES.POISON],
	evolution: ECTOPLASMA,
	evolutionLevel: 40,
	rank: 2,
	baseSkill: SKILLS.LECHOUILLE,
	ppSkill: SKILLS.DEVOREVE,
	wildEncounterChance: 0,
	portraitCropY: 19,
};
