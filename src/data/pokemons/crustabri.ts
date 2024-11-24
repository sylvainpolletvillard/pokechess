import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const CRUSTABRI: PokemonEntry = {
	ref: "crustabri",
	maxPV: 50,
	maxPP: 20,
	attack: 95,
	defense: 180,
	speed: 70,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.GLACE],
	rank: 3,
	baseSkill: SKILLS.PISTOLET_A_O,
	ppSkill: SKILLS.ABRI,
	wildEncounterChance: 0,
	portraitCropY: 21,
};
