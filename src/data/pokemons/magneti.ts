import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { MAGNETON } from "./magneton";

export const MAGNETI: PokemonEntry = {
	ref: "magneti",
	maxPV: 25,
	maxPP: 20,
	attack: 35,
	defense: 70,
	speed: 45,
	types: [POKEMON_TYPES.ELECTRIQUE],
	evolution: MAGNETON,
	evolutionLevel: 30,
	rank: 1,
	baseSkill: SKILLS.ETINCELLE,
	ppSkill: SKILLS.CAGE_ECLAIR,
	wildEncounterChance: 1,
	portraitCropY: 22,
};
