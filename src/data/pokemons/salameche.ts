import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { REPTINCEL } from "./reptincel";

export const SALAMECHE: PokemonEntry = {
	ref: "salameche",
	maxPV: 39,
	maxPP: 20,
	attack: 52,
	defense: 43,
	speed: 65,
	types: [POKEMON_TYPES.FEU],
	evolution: REPTINCEL,
	evolutionLevel: 16,
	rank: 1,
	baseSkill: SKILLS.FLAMMECHE,
	ppSkill: SKILLS.LANCE_FLAMMES,
	wildEncounterChance: 1,
	portraitCropY: 13,
};
