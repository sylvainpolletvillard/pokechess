import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const SCARABRUTE: PokemonEntry = {
	ref: "scarabrute",
	maxPV: 65,
	maxPP: 25,
	attack: 125,
	defense: 100,
	speed: 85,
	types: [POKEMON_TYPES.INSECTE],
	rank: 3,
	baseSkill: SKILLS.GRIFFE,
	ppSkill: SKILLS.GUILLOTINE,
	wildEncounterChance: 0.75,
	portraitCropY: 20,
};
