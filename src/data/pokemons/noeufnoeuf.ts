import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { NOADKOKO } from "./noadkoko";

export const NOEUFNOEUF: PokemonEntry = {
	ref: "noeufnoeuf",
	maxPV: 60,
	maxPP: 20,
	attack: 40,
	defense: 80,
	speed: 40,
	types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.PSY],
	evolution: NOADKOKO,
	evolutionLevel: 40,
	rank: 1,
	baseSkill: SKILLS.PILONNAGE,
	ppSkill: SKILLS.BOMB_OEUF,
	wildEncounterChance: 1,
};
