import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const METAMORPH: PokemonEntry = {
	ref: "metamorph",
	maxPV: 48,
	maxPP: 1,
	attack: 48,
	defense: 48,
	speed: 48,
	types: [POKEMON_TYPES.NORMAL],
	rank: 2,
	baseSkill: SKILLS.MORPHING,
	wildEncounterChance: 1,
};
