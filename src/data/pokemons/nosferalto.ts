import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const NOSFERALTO: PokemonEntry = {
	ref: "nosferalto",
	maxPV: 75,
	maxPP: 20,
	attack: 80,
	defense: 70,
	speed: 90,
	types: [POKEMON_TYPES.VOL, POKEMON_TYPES.POISON],
	rank: 2,
	baseSkill: SKILLS.VAMPIRISME,
	ppSkill: SKILLS.ULTRASON,
	wildEncounterChance: 0,
	portraitCropY: 24,
};
