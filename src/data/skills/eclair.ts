import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ECLAIR: SpecialSkill = {
	name: "Éclair",
	description: "La foudre s'abat sur un Pokémon adverse tiré au hasard",
	type: POKEMON_TYPES.ELECTRIQUE,
	behavior: SkillBehavior.SPECIAL,
	attackRange: 9,
	power: 250,
	effect: EFFECTS.ECLAIR,
	triggerSpecial: "eclair",
};
