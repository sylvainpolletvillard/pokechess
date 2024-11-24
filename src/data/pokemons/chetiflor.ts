import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { BOUSTIFLOR } from "./boustiflor";

export const CHETIFLOR: PokemonEntry = {
	ref: "chetiflor",
	maxPV: 50,
	maxPP: 20,
	attack: 75,
	defense: 35,
	speed: 40,
	types: [POKEMON_TYPES.PLANTE, POKEMON_TYPES.POISON],
	evolution: BOUSTIFLOR,
	evolutionLevel: 21,
	rank: 1,
	baseSkill: SKILLS.FOUET_LIANES,
	ppSkill: SKILLS.ACIDE,
	wildEncounterChance: 1,
	portraitCropY: 11,
};
