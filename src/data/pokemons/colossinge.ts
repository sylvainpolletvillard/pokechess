import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const COLOSSINGE: PokemonEntry = {
	ref: "colossinge",
	maxPV: 65,
	maxPP: 20,
	attack: 105,
	defense: 60,
	speed: 95,
	types: [POKEMON_TYPES.COMBAT],
	rank: 2,
	baseSkill: SKILLS.GRIFFE,
	ppSkill: SKILLS.PROVOC,
	wildEncounterChance: 0,
};
