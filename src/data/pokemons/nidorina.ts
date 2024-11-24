import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { NIDOQUEEN } from "./nidoqueen";

export const NIDORINA: PokemonEntry = {
	ref: "nidorina",
	maxPV: 70,
	maxPP: 20,
	attack: 62,
	defense: 67,
	speed: 56,
	types: [POKEMON_TYPES.POISON],
	evolution: NIDOQUEEN,
	evolutionLevel: 32,
	rank: 1,
	baseSkill: SKILLS.DARD_VENIN,
	ppSkill: SKILLS.RUGISSEMENT,
	wildEncounterChance: 0,
	portraitCropY: 19,
};
