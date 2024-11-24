import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const EMPIFLOR: PokemonEntry = {
	ref: "empiflor",
	maxPV: 80,
	maxPP: 20,
	attack: 105,
	defense: 65,
	speed: 70,
	types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
	rank: 3,
	baseSkill: SKILLS.FOUET_LIANES,
	ppSkill: SKILLS.ACIDE,
	wildEncounterChance: 0,
};
