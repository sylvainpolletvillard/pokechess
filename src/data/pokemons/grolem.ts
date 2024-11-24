import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const GROLEM: PokemonEntry = {
	ref: "grolem",
	maxPV: 80,
	maxPP: 20,
	attack: 120,
	defense: 130,
	speed: 45,
	types: [POKEMON_TYPES.ROCHE, POKEMON_TYPES.SOL],
	rank: 3,
	baseSkill: SKILLS.JET_PIERRES,
	ppSkill: SKILLS.ARMURE,
	wildEncounterChance: 0,
	portraitCropY: 20,
};
