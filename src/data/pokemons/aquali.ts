import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { EVOLI } from "./evoli";

export const AQUALI: PokemonEntry = {
	ref: "aquali",
	maxPV: 130,
	maxPP: 20,
	attack: 65,
	defense: 60,
	speed: 65,
	types: [POKEMON_TYPES.EAU],
	devolution: EVOLI,
	rank: 1,
	baseSkill: SKILLS.PISTOLET_A_O,
	ppSkill: SKILLS.HYDROCANON,
	wildEncounterChance: 1,
	portraitCropY: 24,
};
