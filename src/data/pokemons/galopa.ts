import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const GALOPA: PokemonEntry = {
	ref: "galopa",
	maxPV: 65,
	maxPP: 20,
	attack: 100,
	defense: 70,
	speed: 105,
	types: [POKEMON_TYPES.FEU],
	rank: 2,
	baseSkill: SKILLS.CHARGE,
	ppSkill: SKILLS.NITROCHARGE,
	wildEncounterChance: 0,
	portraitCropY: 9,
};
