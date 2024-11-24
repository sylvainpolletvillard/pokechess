import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";

export const INSECATEUR: PokemonEntry = {
	ref: "insecateur",
	maxPV: 70,
	maxPP: 10,
	attack: 110,
	defense: 80,
	speed: 105,
	types: [POKEMON_TYPES.INSECTE, POKEMON_TYPES.VOL],
	rank: 3,
	baseSkill: SKILLS.VIVE_ATTAQUE,
	ppSkill: SKILLS.DANSE_LAMES,
	wildEncounterChance: 0.5,
	portraitCropY: 20,
};
