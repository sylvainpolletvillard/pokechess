import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const DRACAUFEU: PokemonEntry = {
	ref: "dracaufeu",
	maxPV: 78,
	maxPP: 20,
	attack: 84,
	defense: 78,
	speed: 100,
	types: [POKEMON_TYPES.FEU, POKEMON_TYPES.DRAGON],
	rank: 3,
	baseSkill: SKILLS.FLAMMECHE,
	ppSkill: SKILLS.LANCE_FLAMMES,
	wildEncounterChance: 0,
	portraitCropY: 8,
};
