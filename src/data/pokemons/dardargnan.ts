import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const DARDARGNAN: PokemonEntry = {
	ref: "dardargnan",
	maxPV: 65,
	maxPP: 10,
	attack: 80,
	defense: 40,
	speed: 75,
	types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.POISON],
	rank: 3,
	baseSkill: SKILLS.DARD_VENIN,
	ppSkill: SKILLS.FURIE,
	wildEncounterChance: 0,
};
