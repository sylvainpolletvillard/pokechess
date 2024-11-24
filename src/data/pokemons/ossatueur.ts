import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const OSSATUEUR: PokemonEntry = {
	ref: "ossatueur",
	maxPV: 60,
	maxPP: 20,
	attack: 80,
	defense: 110,
	speed: 45,
	types: [POKEMON_TYPES.SOL],
	rank: 2,
	baseSkill: SKILLS.MASSDOS,
	ppSkill: SKILLS.RUGISSEMENT,
	wildEncounterChance: 0,
	portraitCropY: 10,
};
