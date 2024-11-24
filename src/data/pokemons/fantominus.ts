import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { SPECTRUM } from "./spectrum";

export const FANTOMINUS: PokemonEntry = {
	ref: "fantominus",
	maxPV: 30,
	maxPP: 16,
	attack: 35,
	defense: 30,
	speed: 80,
	types: [POKEMON_TYPES.SPECTRE, POKEMON_TYPES.POISON],
	evolution: SPECTRUM,
	evolutionLevel: 25,
	rank: 1,
	baseSkill: SKILLS.LECHOUILLE,
	ppSkill: SKILLS.DEVOREVE,
	wildEncounterChance: 1,
	portraitCropY: 26,
};
