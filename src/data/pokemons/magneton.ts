import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const MAGNETON: PokemonEntry = {
	ref: "magneton",
	maxPV: 50,
	maxPP: 20,
	attack: 60,
	defense: 95,
	speed: 70,
	types: [POKEMON_TYPES.ELECTRIQUE],
	rank: 2,
	baseSkill: SKILLS.ETINCELLE,
	ppSkill: SKILLS.CAGE_ECLAIR,
	wildEncounterChance: 0,
	portraitCropY: 21,
};
