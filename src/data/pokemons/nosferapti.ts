import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { NOSFERALTO } from "./nosferalto";

export const NOSFERAPTI: PokemonEntry = {
	ref: "nosferapti",
	maxPV: 40,
	maxPP: 20,
	attack: 45,
	defense: 35,
	speed: 55,
	types: [POKEMON_TYPES.VOL, POKEMON_TYPES.POISON],
	evolution: NOSFERALTO,
	evolutionLevel: 25,
	rank: 1,
	baseSkill: SKILLS.VAMPIRISME,
	ppSkill: SKILLS.ULTRASON,
	wildEncounterChance: 1,
	portraitCropY: 24,
};
