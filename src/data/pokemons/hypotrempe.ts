import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { HYPOCEAN } from "./hypocean";

export const HYPOTREMPE: PokemonEntry = {
	ref: "hypotrempe",
	maxPV: 30,
	maxPP: 20,
	attack: 40,
	defense: 70,
	speed: 60,
	types: [POKEMON_TYPES.EAU],
	evolution: HYPOCEAN,
	evolutionLevel: 32,
	rank: 1,
	baseSkill: SKILLS.BULLES_D_O,
	ppSkill: SKILLS.OURAGAN,
	wildEncounterChance: 1,
};
