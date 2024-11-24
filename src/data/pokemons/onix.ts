import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const ONIX: PokemonEntry = {
	ref: "onix",
	maxPV: 35,
	maxPP: 20,
	attack: 45,
	defense: 160,
	speed: 70,
	types: [POKEMON_TYPES.ROCHE, POKEMON_TYPES.SOL],
	rank: 1,
	baseSkill: SKILLS.JET_PIERRES,
	ppSkill: SKILLS.ARMURE,
	wildEncounterChance: 1,
	portraitCropY: 30,
};
