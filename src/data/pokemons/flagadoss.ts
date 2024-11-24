import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const FLAGADOSS: PokemonEntry = {
	ref: "flagadoss",
	maxPV: 95,
	maxPP: 20,
	attack: 75,
	defense: 110,
	speed: 30,
	types: [POKEMON_TYPES.EAU, POKEMON_TYPES.PSY],
	rank: 2,
	baseSkill: SKILLS.PISTOLET_A_O,
	ppSkill: SKILLS.AMNESIE,
	wildEncounterChance: 0,
};
