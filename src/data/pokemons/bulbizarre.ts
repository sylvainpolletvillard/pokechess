import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { HERBIZARRE } from "./herbizarre";

export const BULBIZARRE: PokemonEntry = {
	ref: "bulbizarre",
	maxPV: 45,
	maxPP: 20,
	attack: 49,
	defense: 49,
	speed: 45,
	types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
	evolution: HERBIZARRE,
	evolutionLevel: 16,
	rank: 1,
	baseSkill: SKILLS.FOUET_LIANES,
	ppSkill: SKILLS.LANCE_SOLEIL,
	wildEncounterChance: 1,
	portraitCropY: 24,
};
