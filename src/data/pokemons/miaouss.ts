import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { PERSIAN } from "./persian";

export const MIAOUSS: PokemonEntry = {
	ref: "miaouss",
	maxPV: 40,
	maxPP: 20,
	attack: 45,
	defense: 35,
	speed: 90,
	types: [POKEMON_TYPES.NORMAL],
	evolution: PERSIAN,
	evolutionLevel: 28,
	rank: 1,
	baseSkill: SKILLS.GRIFFE,
	ppSkill: SKILLS.JACKPOT,
	wildEncounterChance: 1,
};
