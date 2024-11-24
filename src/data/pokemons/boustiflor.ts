import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { EMPIFLOR } from "./empiflor";

export const BOUSTIFLOR: PokemonEntry = {
	ref: "boustiflor",
	maxPV: 65,
	maxPP: 20,
	attack: 90,
	defense: 50,
	speed: 55,
	types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
	evolution: EMPIFLOR,
	evolutionLevel: 38,
	rank: 2,
	baseSkill: SKILLS.FOUET_LIANES,
	ppSkill: SKILLS.ACIDE,
	wildEncounterChance: 0,
	portraitCropY: 26,
};
