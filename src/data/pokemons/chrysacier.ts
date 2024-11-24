import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { PAPILUSION } from "./papilusion";

export const CHRYSACIER: PokemonEntry = {
	ref: "chrysacier",
	maxPV: 50,
	maxPP: 20,
	attack: 20,
	defense: 55,
	speed: 30,
	types: [POKEMON_TYPES.INSECTE],
	evolution: PAPILUSION,
	evolutionLevel: 10,
	rank: 2,
	baseSkill: SKILLS.PIQURE,
	ppSkill: SKILLS.SECRETION,
	wildEncounterChance: 0,
	portraitCropY: 18,
};
