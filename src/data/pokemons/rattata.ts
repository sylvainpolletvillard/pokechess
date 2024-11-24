import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { RATTATAC } from "./rattatac";

export const RATTATA: PokemonEntry = {
	ref: "rattata",
	maxPV: 30,
	maxPP: 20,
	attack: 56,
	defense: 35,
	speed: 72,
	types: [POKEMON_TYPES.NORMAL],
	evolution: RATTATAC,
	evolutionLevel: 20,
	rank: 1,
	baseSkill: SKILLS.MORSURE,
	ppSkill: SKILLS.CROC_DE_MORT,
	wildEncounterChance: 1,
	portraitCropY: 24,
};
