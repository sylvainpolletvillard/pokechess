import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const MR_MIME: PokemonEntry = {
	ref: "mrmime",
	maxPV: 40,
	maxPP: 15,
	attack: 45,
	defense: 65,
	speed: 90,
	types: [POKEMON_TYPES.PSY, POKEMON_TYPES.FEE],
	rank: 1,
	baseSkill: SKILLS.TORGNOLES,
	ppSkill: SKILLS.ENCORE,
	wildEncounterChance: 1,
};
