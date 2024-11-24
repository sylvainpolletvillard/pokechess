import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const KANGOUREX: PokemonEntry = {
	ref: "kangourex",
	maxPV: 105,
	maxPP: 20,
	attack: 95,
	defense: 80,
	speed: 90,
	types: [POKEMON_TYPES.NORMAL],
	rank: 2,
	baseSkill: SKILLS.MORSURE,
	ppSkill: SKILLS.ULTIMAPOING,
	wildEncounterChance: 1,
	portraitCropY: 8,
};
