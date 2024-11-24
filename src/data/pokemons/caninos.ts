import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { ARCANIN } from "./arcanin";

export const CANINOS: PokemonEntry = {
	ref: "caninos",
	maxPV: 55,
	maxPP: 20,
	attack: 70,
	defense: 45,
	speed: 60,
	types: [POKEMON_TYPES.FEU],
	evolution: ARCANIN,
	evolutionLevel: 30,
	rank: 1,
	baseSkill: SKILLS.MORSURE,
	ppSkill: SKILLS.CROCS_FEU,
	wildEncounterChance: 1,
};
