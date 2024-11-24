import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { EVOLI } from "./evoli";

export const PYROLI: PokemonEntry = {
	ref: "pyroli",
	maxPV: 65,
	maxPP: 20,
	attack: 130,
	defense: 60,
	speed: 65,
	types: [POKEMON_TYPES.FEU],
	devolution: EVOLI,
	rank: 1,
	baseSkill: SKILLS.FLAMMECHE,
	ppSkill: SKILLS.CROCS_FEU,
	wildEncounterChance: 1,
	portraitCropY: 15,
};
