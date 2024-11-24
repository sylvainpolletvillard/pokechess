import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const MEWTWO: PokemonEntry = {
	ref: "mewtwo",
	maxPV: 106,
	maxPP: 20,
	attack: 110,
	defense: 90,
	speed: 130,
	types: [POKEMON_TYPES.PSY],
	rank: 5,
	baseSkill: SKILLS.CHOC_MENTAL,
	ppSkill: SKILLS.PSYKO,
	wildEncounterChance: 0,
	portraitCropY: 5,
};
