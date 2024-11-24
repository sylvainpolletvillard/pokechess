import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { RAFFLESIA } from "./rafflesia";

export const ORTIDE: PokemonEntry = {
	ref: "ortide",
	maxPV: 60,
	maxPP: 20,
	attack: 65,
	defense: 70,
	speed: 40,
	types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
	evolution: RAFFLESIA,
	evolutionLevel: 37,
	rank: 2,
	baseSkill: SKILLS.VOL_VIE,
	ppSkill: SKILLS.POUDRE_TOXIK,
	wildEncounterChance: 0,
	portraitCropY: 22,
};
