import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const DODRIO: PokemonEntry = {
	ref: "dodrio",
	maxPV: 60,
	maxPP: 10,
	attack: 110,
	defense: 70,
	speed: 110,
	types: [POKEMON_TYPES.NORMAL, POKEMON_TYPES.VOL],
	rank: 2,
	baseSkill: SKILLS.TRIPLATTAQUE,
	ppSkill: SKILLS.FURIE,
	wildEncounterChance: 0,
};
