import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const NOADKOKO: PokemonEntry = {
	ref: "noadkoko",
	maxPV: 60,
	maxPP: 15,
	attack: 95,
	defense: 85,
	speed: 55,
	types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.PSY],
	rank: 2,
	baseSkill: SKILLS.PILONNAGE,
	ppSkill: SKILLS.BOMB_OEUF,
	wildEncounterChance: 0,
	portraitCropY: 20,
};
