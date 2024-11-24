import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { ORTIDE } from "./ortide";

export const MYSTHERBE: PokemonEntry = {
	ref: "mystherbe",
	maxPV: 45,
	maxPP: 20,
	attack: 50,
	defense: 55,
	speed: 30,
	types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
	evolution: ORTIDE,
	evolutionLevel: 21,
	rank: 1,
	baseSkill: SKILLS.VOL_VIE,
	ppSkill: SKILLS.POUDRE_TOXIK,
	wildEncounterChance: 1,
	portraitCropY: 28,
};
