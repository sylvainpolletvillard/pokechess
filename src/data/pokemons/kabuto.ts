import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { KABUTOPS } from "./kabutops";

export const KABUTO: PokemonEntry = {
	ref: "kabuto",
	maxPV: 30,
	maxPP: 20,
	attack: 80,
	defense: 90,
	speed: 55,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.ROCHE],
	evolution: KABUTOPS,
	evolutionLevel: 40,
	rank: 1,
	baseSkill: SKILLS.GRIFFE,
	ppSkill: SKILLS.POUVOIR_ANTIQUE,
	wildEncounterChance: 0.1,
	portraitCropY: 19,
};
