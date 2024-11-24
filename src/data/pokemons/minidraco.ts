import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { DRACO } from "./draco";

export const MINIDRACO: PokemonEntry = {
	ref: "minidraco",
	maxPV: 41,
	maxPP: 20,
	attack: 64,
	defense: 45,
	speed: 50,
	types: [POKEMON_TYPES.DRAGON],
	evolution: DRACO,
	evolutionLevel: 30,
	rank: 1,
	baseSkill: SKILLS.DRACOCHARGE,
	ppSkill: SKILLS.OURAGAN,
	wildEncounterChance: 1,
};
