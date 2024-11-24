import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { MELODELFE } from "./melodelfe";

export const MELOFEE: PokemonEntry = {
	ref: "melofee",
	maxPV: 70,
	maxPP: 20,
	attack: 45,
	defense: 48,
	speed: 35,
	types: [POKEMON_TYPES.FEE],
	evolution: MELODELFE,
	evolutionLevel: 26,
	rank: 1,
	baseSkill: SKILLS.TORGNOLES,
	ppSkill: SKILLS.POUVOIR_LUNAIRE,
	wildEncounterChance: 1,
};
