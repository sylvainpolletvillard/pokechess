import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const ELECTHOR: PokemonEntry = {
	ref: "electhor",
	maxPV: 90,
	maxPP: 30,
	attack: 90,
	defense: 85,
	speed: 100,
	types: [POKEMON_TYPES.VOL, POKEMON_TYPES.ELECTRIQUE],
	rank: 5,
	baseSkill: SKILLS.ETINCELLE,
	ppSkill: SKILLS.FATAL_FOUDRE,
	wildEncounterChance: 0,
};
