import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { FEUNARD } from "./feunard";

export const GOUPIX: PokemonEntry = {
	ref: "goupix",
	maxPV: 38,
	maxPP: 20,
	attack: 41,
	defense: 40,
	speed: 65,
	types: [POKEMON_TYPES.FEU],
	evolution: FEUNARD,
	evolutionLevel: 20,
	rank: 1,
	baseSkill: SKILLS.FLAMMECHE,
	ppSkill: SKILLS.DANSE_FLAMMES,
	wildEncounterChance: 1,
};
