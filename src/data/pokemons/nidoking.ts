import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const NIDOKING: PokemonEntry = {
	ref: "nidoking",
	maxPV: 81,
	maxPP: 20,
	attack: 102,
	defense: 77,
	speed: 85,
	types: [POKEMON_TYPES.POISON, POKEMON_TYPES.SOL],
	rank: 1,
	baseSkill: SKILLS.DOUBLE_PIED,
	ppSkill: SKILLS.EMPAL_KORNE,
	wildEncounterChance: 0,
};
