import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { MACHOPEUR } from "./machopeur";

export const MACHOC: PokemonEntry = {
	ref: "machoc",
	maxPV: 70,
	maxPP: 20,
	attack: 80,
	defense: 50,
	speed: 35,
	types: [POKEMON_TYPES.COMBAT],
	evolution: MACHOPEUR,
	evolutionLevel: 28,
	rank: 1,
	baseSkill: SKILLS.POING_KARATE,
	ppSkill: SKILLS.BALAYAGE,
	wildEncounterChance: 1,
	portraitCropY: 12,
};
