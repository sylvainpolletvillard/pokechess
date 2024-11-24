import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const E_COQUE: SpecialSkill = {
	name: "E-Coque",
	description: "Libère un oeuf magique qui soigne toute votre équipe",
	attackRange: 9,
	effect: EFFECTS.E_COQUE,
	behavior: SkillBehavior.SPECIAL,
	power: 0,
	type: POKEMON_TYPES.PSY,
	triggerSpecial: "e-coque",
	triggerSpecialDelay: 250,
};
