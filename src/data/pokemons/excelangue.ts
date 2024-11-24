import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const EXCELANGUE: PokemonEntry = {
	ref: "excelangue",
	maxPV: 50,
	maxPP: 20,
	attack: 105,
	defense: 79,
	speed: 76,
	types: [POKEMON_TYPES.NORMAL],
	rank: 2,
	baseSkill: SKILLS.LECHOUILLE,
	ppSkill: SKILLS.ULTRASON,
	wildEncounterChance: 1,
};
