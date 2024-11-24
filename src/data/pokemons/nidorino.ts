import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { NIDOKING } from "./nidoking";

export const NIDORINO: PokemonEntry = {
	ref: "nidorino",
	maxPV: 61,
	maxPP: 20,
	attack: 72,
	defense: 57,
	speed: 65,
	types: [POKEMON_TYPES.POISON],
	evolution: NIDOKING,
	evolutionLevel: 32,
	rank: 1,
	baseSkill: SKILLS.DARD_VENIN,
	ppSkill: SKILLS.EMPAL_KORNE,
	wildEncounterChance: 0,
	portraitCropY: 26,
};
