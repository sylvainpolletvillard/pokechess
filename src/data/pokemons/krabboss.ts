import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const KRABBOSS: PokemonEntry = {
	ref: "krabboss",
	maxPV: 55,
	maxPP: 30,
	attack: 130,
	defense: 115,
	speed: 75,
	types: [POKEMON_TYPES.EAU],
	rank: 2,
	baseSkill: SKILLS.PINCE_MASSE,
	ppSkill: SKILLS.GUILLOTINE,
	wildEncounterChance: 0,
	portraitCropY: 21,
};
