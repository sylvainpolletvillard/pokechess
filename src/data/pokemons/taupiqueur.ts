import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { TRIOPIKEUR } from "./triopikeur";

export const TAUPIQUEUR: PokemonEntry = {
	ref: "taupiqueur",
	maxPV: 10,
	maxPP: 15,
	attack: 55,
	defense: 25,
	speed: 95,
	types: [POKEMON_TYPES.SOL],
	evolution: TRIOPIKEUR,
	evolutionLevel: 26,
	rank: 1,
	baseSkill: SKILLS.COUD_BOUE,
	ppSkill: SKILLS.TUNNEL,
	wildEncounterChance: 1,
	portraitCropY: 22,
};
