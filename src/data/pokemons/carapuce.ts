import { t } from "../../i18n";
import type { PokemonEntry } from "../pokemons";
import { SKILLS } from "../skills";
import { POKEMON_TYPES } from "../types";
import { CARABAFFE } from "./carabaffe";

export const CARAPUCE: PokemonEntry = {
	ref: "carapuce",
	maxPV: 44,
	maxPP: 20,
	attack: 48,
	defense: 65,
	speed: 43,
	types: [POKEMON_TYPES.EAU],
	evolution: CARABAFFE,
	evolutionLevel: 16,
	rank: 1,
	baseSkill: SKILLS.PISTOLET_A_O,
	ppSkill: SKILLS.HYDROCANON,
	wildEncounterChance: 1,
};
