import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const NIDOQUEEN: PokemonEntry = {
	ref: "nidoqueen",
	maxPV: 90,
	maxPP: 20,
	attack: 82,
	defense: 87,
	speed: 76,
	types: [POKEMON_TYPES.POISON, POKEMON_TYPES.SOL],
	rank: 1,
	baseSkill: SKILLS.DOUBLE_PIED,
	ppSkill: SKILLS.RUGISSEMENT,
	wildEncounterChance: 0,
	portraitCropY: 9,
};
