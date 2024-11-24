import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const LOKHLASS: PokemonEntry = {
	ref: "lokhlass",
	maxPV: 130,
	maxPP: 16,
	attack: 85,
	defense: 80,
	speed: 60,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.GLACE],
	rank: 3,
	baseSkill: SKILLS.PISTOLET_A_O,
	ppSkill: SKILLS.SURF,
	wildEncounterChance: 0.5,
	portraitCropY: 6,
};
