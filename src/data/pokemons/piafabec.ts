import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { RAPASDEPIC } from "./rapasdepic";

export const PIAFABEC: PokemonEntry = {
	ref: "piafabec",
	maxPV: 40,
	maxPP: 10,
	attack: 60,
	defense: 30,
	speed: 70,
	types: [POKEMON_TYPES.VOL, POKEMON_TYPES.NORMAL],
	evolution: RAPASDEPIC,
	evolutionLevel: 20,
	rank: 1,
	baseSkill: SKILLS.PICPIC,
	ppSkill: SKILLS.HATE,
	wildEncounterChance: 1,
};
