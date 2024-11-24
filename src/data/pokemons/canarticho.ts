import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const CANARTICHO: PokemonEntry = {
	ref: "canarticho",
	maxPV: 52,
	maxPP: 15,
	attack: 90,
	defense: 55,
	speed: 60,
	types: [POKEMON_TYPES.NORMAL, POKEMON_TYPES.VOL],
	rank: 1,
	baseSkill: SKILLS.PICPIC,
	ppSkill: SKILLS.DANSE_LAMES,
	wildEncounterChance: 1,
	portraitCropY: 19,
};
