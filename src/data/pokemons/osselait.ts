import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { OSSATUEUR } from "./ossatueur";

export const OSSELAIT: PokemonEntry = {
	ref: "osselait",
	maxPV: 50,
	maxPP: 20,
	attack: 50,
	defense: 95,
	speed: 35,
	types: [POKEMON_TYPES.SOL],
	evolution: OSSATUEUR,
	evolutionLevel: 28,
	rank: 1,
	baseSkill: SKILLS.MASSDOS,
	ppSkill: SKILLS.RUGISSEMENT,
	wildEncounterChance: 1,
	portraitCropY: 14,
};
