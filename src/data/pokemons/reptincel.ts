import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { DRACAUFEU } from "./dracaufeu";

export const REPTINCEL: PokemonEntry = {
	ref: "reptincel",
	maxPV: 58,
	maxPP: 20,
	attack: 64,
	defense: 58,
	speed: 80,
	types: [POKEMON_TYPES.FEU],
	evolution: DRACAUFEU,
	evolutionLevel: 36,
	rank: 2,
	baseSkill: SKILLS.FLAMMECHE,
	ppSkill: SKILLS.LANCE_FLAMMES,
	wildEncounterChance: 0,
};
