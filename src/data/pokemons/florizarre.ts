import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const FLORIZARRE: PokemonEntry = {
	ref: "florizarre",
	maxPV: 80,
	maxPP: 20,
	attack: 82,
	defense: 83,
	speed: 80,
	types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
	rank: 3,
	baseSkill: SKILLS.FOUET_LIANES,
	ppSkill: SKILLS.LANCE_SOLEIL,
	wildEncounterChance: 0,
	portraitCropY: 38,
};
