import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const LEVIATOR: PokemonEntry = {
	ref: "leviator",
	maxPV: 95,
	maxPP: 25,
	attack: 125,
	defense: 79,
	speed: 81,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.VOL],
	rank: 3,
	baseSkill: SKILLS.MORSURE,
	ppSkill: SKILLS.DRACORAGE,
	wildEncounterChance: 0,
	portraitCropY: 22,
};
