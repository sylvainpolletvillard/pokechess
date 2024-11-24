import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { RAICHU } from "./raichu";

export const PIKACHU: PokemonEntry = {
	ref: "pikachu",
	maxPV: 35,
	maxPP: 30,
	attack: 55,
	defense: 40,
	speed: 90,
	types: [POKEMON_TYPES.ELECTRIQUE],
	evolution: RAICHU,
	evolutionLevel: 22,
	rank: 1,
	baseSkill: SKILLS.VIVE_ATTAQUE,
	ppSkill: SKILLS.ECLAIR,
	wildEncounterChance: 1,
};
