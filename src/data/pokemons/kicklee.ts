import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const KICKLEE: PokemonEntry = {
	ref: "kicklee",
	maxPV: 50,
	maxPP: 12,
	attack: 120,
	defense: 53,
	speed: 87,
	types: [POKEMON_TYPES.COMBAT],
	rank: 2,
	baseSkill: SKILLS.DOUBLE_PIED,
	ppSkill: SKILLS.MAWASHI_GERI,
	wildEncounterChance: 0.75,
};
