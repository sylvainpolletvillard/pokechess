import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const EVOLI: PokemonEntry = {
	ref: "evoli",
	maxPV: 55,
	maxPP: 40,
	attack: 55,
	defense: 50,
	speed: 55,
	types: [POKEMON_TYPES.NORMAL],
	rank: 1,
	baseSkill: SKILLS.VIVE_ATTAQUE,
	ppSkill: SKILLS.EVOLUTION,
	wildEncounterChance: 1,
};
