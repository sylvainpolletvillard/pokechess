import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const LEVEINARD: PokemonEntry = {
	ref: "leveinard",
	maxPV: 250,
	maxPP: 20,
	attack: 5,
	defense: 5,
	speed: 50,
	types: [POKEMON_TYPES.NORMAL],
	rank: 3,
	baseSkill: SKILLS.TORGNOLES,
	ppSkill: SKILLS.E_COQUE,
	wildEncounterChance: 0.5,
};
