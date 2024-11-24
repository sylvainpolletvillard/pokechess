import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const MACKOGNEUR: PokemonEntry = {
	ref: "mackogneur",
	maxPV: 90,
	maxPP: 20,
	attack: 130,
	defense: 80,
	speed: 55,
	types: [POKEMON_TYPES.COMBAT],
	rank: 3,
	baseSkill: SKILLS.POING_KARATE,
	ppSkill: SKILLS.BALAYAGE,
	wildEncounterChance: 0,
	portraitCropY: 8,
};
