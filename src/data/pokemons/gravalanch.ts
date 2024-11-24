import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { GROLEM } from "./grolem";

export const GRAVALANCH: PokemonEntry = {
	ref: "gravalanch",
	maxPV: 55,
	maxPP: 20,
	attack: 95,
	defense: 115,
	speed: 35,
	types: [POKEMON_TYPES.ROCHE, POKEMON_TYPES.SOL],
	evolution: GROLEM,
	evolutionLevel: 38,
	rank: 2,
	baseSkill: SKILLS.JET_PIERRES,
	ppSkill: SKILLS.ARMURE,
	wildEncounterChance: 0,
	portraitCropY: 20,
};
