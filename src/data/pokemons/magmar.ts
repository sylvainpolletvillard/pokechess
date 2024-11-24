import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const MAGMAR: PokemonEntry = {
	ref: "magmar",
	maxPV: 65,
	maxPP: 20,
	attack: 95,
	defense: 57,
	speed: 93,
	types: [POKEMON_TYPES.FEU],
	rank: 2,
	baseSkill: SKILLS.FLAMMECHE,
	ppSkill: SKILLS.BROUILLARD,
	wildEncounterChance: 0.5,
	portraitCropY: 12,
};
