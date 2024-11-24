import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { TORTANK } from "./tortank";

export const CARABAFFE: PokemonEntry = {
	ref: "carabaffe",
	maxPV: 59,
	maxPP: 20,
	attack: 63,
	defense: 80,
	speed: 58,
	types: [POKEMON_TYPES.EAU],
	evolution: TORTANK,
	evolutionLevel: 36,
	rank: 2,
	baseSkill: SKILLS.PISTOLET_A_O,
	ppSkill: SKILLS.HYDROCANON,
	wildEncounterChance: 0,
};
