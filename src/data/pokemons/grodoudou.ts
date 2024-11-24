import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const GRODOUDOU: PokemonEntry = {
	ref: "grodoudou",
	maxPV: 140,
	maxPP: 20,
	attack: 70,
	defense: 45,
	speed: 45,
	types: [POKEMON_TYPES.FEE],
	rank: 2,
	baseSkill: SKILLS.TORGNOLES,
	ppSkill: SKILLS.BERCEUSE,
	wildEncounterChance: 0,
	portraitCropY: 14,
};
