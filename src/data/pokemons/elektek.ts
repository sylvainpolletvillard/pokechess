import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const ELEKTEK: PokemonEntry = {
	ref: "elektek",
	maxPV: 65,
	maxPP: 20,
	attack: 83,
	defense: 57,
	speed: 105,
	types: [POKEMON_TYPES.ELECTRIQUE],
	rank: 2,
	baseSkill: SKILLS.ETINCELLE,
	ppSkill: SKILLS.TONNERRE,
	wildEncounterChance: 0.5,
};
