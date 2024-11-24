import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { NIDORINO } from "./nidorino";

export const NIDORAN_MALE: PokemonEntry = {
	ref: "nidoran_m",
	maxPV: 46,
	maxPP: 20,
	attack: 57,
	defense: 40,
	speed: 50,
	types: [POKEMON_TYPES.POISON],
	evolution: NIDORINO,
	evolutionLevel: 16,
	rank: 1,
	baseSkill: SKILLS.DARD_VENIN,
	ppSkill: SKILLS.EMPAL_KORNE,
	wildEncounterChance: 1,
	portraitCropY: 26,
};
