import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const HYPNOMADE: PokemonEntry = {
	ref: "hypnomade",
	maxPV: 85,
	maxPP: 20,
	attack: 73,
	defense: 70,
	speed: 67,
	types: [POKEMON_TYPES.PSY],
	rank: 2,
	baseSkill: SKILLS.CHOC_MENTAL,
	ppSkill: SKILLS.HYPNOSE,
	wildEncounterChance: 0,
	portraitCropY: 17,
};
