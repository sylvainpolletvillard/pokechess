import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const LAMANTINE: PokemonEntry = {
	ref: "lamantine",
	maxPV: 90,
	maxPP: 20,
	attack: 70,
	defense: 80,
	speed: 70,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.GLACE],
	rank: 2,
	baseSkill: SKILLS.POUDREUSE,
	ppSkill: SKILLS.LASER_GLACE,
	wildEncounterChance: 0,
	portraitCropY: 8,
};
