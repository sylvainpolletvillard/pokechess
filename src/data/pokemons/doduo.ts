import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { DODRIO } from "./dodrio";

export const DODUO: PokemonEntry = {
	ref: "doduo",
	maxPV: 35,
	maxPP: 10,
	attack: 85,
	defense: 45,
	speed: 75,
	types: [POKEMON_TYPES.NORMAL, POKEMON_TYPES.VOL],
	evolution: DODRIO,
	evolutionLevel: 31,
	rank: 1,
	baseSkill: SKILLS.VIVE_ATTAQUE,
	ppSkill: SKILLS.FURIE,
	wildEncounterChance: 1,
};
