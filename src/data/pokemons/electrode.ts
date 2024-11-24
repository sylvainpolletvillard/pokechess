import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const ELECTRODE: PokemonEntry = {
	ref: "electrode",
	maxPV: 60,
	maxPP: 50,
	attack: 50,
	defense: 70,
	speed: 150,
	types: [POKEMON_TYPES.ELECTRIQUE],
	rank: 2,
	baseSkill: SKILLS.CHARGE,
	ppSkill: SKILLS.DESTRUCTION,
	wildEncounterChance: 0,
	portraitCropY: 24,
};
