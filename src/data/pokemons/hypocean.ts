import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const HYPOCEAN: PokemonEntry = {
	ref: "hypocean",
	maxPV: 55,
	maxPP: 20,
	attack: 65,
	defense: 95,
	speed: 85,
	types: [POKEMON_TYPES.EAU],
	rank: 2,
	baseSkill: SKILLS.BULLES_D_O,
	ppSkill: SKILLS.OURAGAN,
	wildEncounterChance: 0,
};
