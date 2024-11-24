import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const MELODELFE: PokemonEntry = {
	ref: "melodelfe",
	maxPV: 95,
	maxPP: 20,
	attack: 70,
	defense: 73,
	speed: 60,
	types: [POKEMON_TYPES.FEE],
	rank: 1,
	baseSkill: SKILLS.TORGNOLES,
	ppSkill: SKILLS.POUVOIR_LUNAIRE,
	wildEncounterChance: 0,
};
