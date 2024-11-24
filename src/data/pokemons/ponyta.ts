import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { GALOPA } from "./galopa";

export const PONYTA: PokemonEntry = {
	ref: "ponyta",
	maxPV: 50,
	maxPP: 20,
	attack: 85,
	defense: 55,
	speed: 90,
	types: [POKEMON_TYPES.FEU],
	evolution: GALOPA,
	evolutionLevel: 40,
	rank: 1,
	baseSkill: SKILLS.CHARGE,
	ppSkill: SKILLS.NITROCHARGE,
	wildEncounterChance: 1,
	portraitCropY: 13,
};
