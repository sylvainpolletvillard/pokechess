import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { CHRYSACIER } from "./chrysacier";

export const CHENIPAN: PokemonEntry = {
	ref: "chenipan",
	maxPV: 45,
	maxPP: 20,
	attack: 30,
	defense: 35,
	speed: 45,
	types: [POKEMON_TYPES.INSECTE],
	evolution: CHRYSACIER,
	evolutionLevel: 7,
	rank: 1,
	baseSkill: SKILLS.PIQURE,
	ppSkill: SKILLS.SECRETION,
	wildEncounterChance: 1,
};
