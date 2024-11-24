import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const FEUNARD: PokemonEntry = {
	ref: "feunard",
	maxPV: 73,
	maxPP: 20,
	attack: 76,
	defense: 75,
	speed: 100,
	types: [POKEMON_TYPES.FEU],
	rank: 3,
	baseSkill: SKILLS.FLAMMECHE,
	ppSkill: SKILLS.DANSE_FLAMMES,
	wildEncounterChance: 0,
	portraitCropY: 13,
};
