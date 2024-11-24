import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const MEW: PokemonEntry = {
	ref: "mew",
	maxPV: 100,
	maxPP: 5,
	attack: 100,
	defense: 100,
	speed: 100,
	types: [POKEMON_TYPES.PSY],
	rank: 5,
	baseSkill: SKILLS.CHOC_MENTAL,
	ppSkill: SKILLS.METRONOME,
	wildEncounterChance: 0.02,
};
