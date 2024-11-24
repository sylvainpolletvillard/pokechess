import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { CRUSTABRI } from "./crustabri";

export const KOKIYAS: PokemonEntry = {
	ref: "kokiyas",
	maxPV: 30,
	maxPP: 20,
	attack: 65,
	defense: 100,
	speed: 40,
	types: [POKEMON_TYPES.EAU],
	evolution: CRUSTABRI,
	evolutionLevel: 27,
	rank: 1,
	baseSkill: SKILLS.PISTOLET_A_O,
	ppSkill: SKILLS.ABRI,
	wildEncounterChance: 1,
	portraitCropY: 24,
};
