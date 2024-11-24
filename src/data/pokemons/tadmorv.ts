import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { GROTADMORV } from "./grotadmorv";

export const TADMORV: PokemonEntry = {
	ref: "tadmorv",
	maxPV: 80,
	maxPP: 20,
	attack: 80,
	defense: 50,
	speed: 25,
	types: [POKEMON_TYPES.POISON],
	evolution: GROTADMORV,
	evolutionLevel: 38,
	rank: 1,
	baseSkill: SKILLS.COUD_BOUE,
	ppSkill: SKILLS.BOMB_BEURK,
	wildEncounterChance: 1,
};
