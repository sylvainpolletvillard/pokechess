import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { COLOSSINGE } from "./colossinge";

export const FEROSINGE: PokemonEntry = {
	ref: "ferosinge",
	maxPV: 40,
	maxPP: 20,
	attack: 80,
	defense: 35,
	speed: 70,
	types: [POKEMON_TYPES.COMBAT],
	evolution: COLOSSINGE,
	evolutionLevel: 28,
	rank: 1,
	baseSkill: SKILLS.GRIFFE,
	ppSkill: SKILLS.PROVOC,
	wildEncounterChance: 1,
};
