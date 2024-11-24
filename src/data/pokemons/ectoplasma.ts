import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const ECTOPLASMA: PokemonEntry = {
	ref: "ectoplasma",
	maxPV: 60,
	maxPP: 16,
	attack: 65,
	defense: 60,
	speed: 110,
	types: [POKEMON_TYPES.SPECTRE, POKEMON_TYPES.POISON],
	rank: 3,
	baseSkill: SKILLS.LECHOUILLE,
	ppSkill: SKILLS.DEVOREVE,
	wildEncounterChance: 0,
	portraitCropY: 23,
};
