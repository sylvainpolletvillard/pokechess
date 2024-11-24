import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { LEVIATOR } from "./leviator";

export const MAGICARPE: PokemonEntry = {
	ref: "magicarpe",
	maxPV: 20,
	maxPP: 0,
	attack: 10,
	defense: 55,
	speed: 80,
	types: [POKEMON_TYPES.EAU],
	evolution: LEVIATOR,
	evolutionLevel: 20,
	rank: 1,
	baseSkill: SKILLS.TREMPETTE,
	wildEncounterChance: 1,
	portraitCropY: 21,
};
