import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { DRACOLOSSE } from "./dracolosse";

export const DRACO: PokemonEntry = {
	ref: "draco",
	maxPV: 61,
	maxPP: 20,
	attack: 84,
	defense: 65,
	speed: 70,
	types: [POKEMON_TYPES.DRAGON],
	evolution: DRACOLOSSE,
	evolutionLevel: 55,
	rank: 2,
	baseSkill: SKILLS.DRACOCHARGE,
	ppSkill: SKILLS.OURAGAN,
	wildEncounterChance: 0,
	portraitCropY: 10,
};
