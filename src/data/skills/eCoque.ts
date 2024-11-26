import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const E_COQUE: SpecialSkill = {
	ref: "e_coque",
	attackRange: 9,
	effect: EFFECTS.E_COQUE,
	behavior: SkillBehavior.SPECIAL,
	power: 0,
	type: POKEMON_TYPES.PSY,
	triggerSpecial: "e-coque",
	triggerSpecialDelay: 250,
};
