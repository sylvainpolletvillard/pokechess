import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { MACKOGNEUR } from "./mackogneur";

export const MACHOPEUR: PokemonEntry = {
	ref: "machopeur",
	maxPV: 80,
	maxPP: 20,
	attack: 100,
	defense: 70,
	speed: 45,
	types: [POKEMON_TYPES.COMBAT],
	evolution: MACKOGNEUR,
	evolutionLevel: 40,
	rank: 2,
	baseSkill: SKILLS.POING_KARATE,
	ppSkill: SKILLS.BALAYAGE,
	wildEncounterChance: 0,
	portraitCropY: 12,
};
