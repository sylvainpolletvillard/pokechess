import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const KABUTOPS: PokemonEntry = {
	ref: "kabutops",
	maxPV: 60,
	maxPP: 20,
	attack: 115,
	defense: 105,
	speed: 70,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.ROCHE],
	rank: 3,
	baseSkill: SKILLS.GRIFFE,
	ppSkill: SKILLS.POUVOIR_ANTIQUE,
	wildEncounterChance: 0,
	portraitCropY: 18,
};
