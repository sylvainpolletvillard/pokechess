import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const GROTADMORV: PokemonEntry = {
	ref: "grotadmorv",
	maxPV: 105,
	maxPP: 20,
	attack: 105,
	defense: 75,
	speed: 50,
	types: [POKEMON_TYPES.POISON],
	rank: 2,
	baseSkill: SKILLS.COUD_BOUE,
	ppSkill: SKILLS.BOMB_BEURK,
	wildEncounterChance: 0,
};
