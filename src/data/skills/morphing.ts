import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const MORPHING: SpecialSkill = {
	ref: "morphing",
	attackRange: 9,
	effect: EFFECTS.EVOLUTION,
	behavior: SkillBehavior.SPECIAL,
	power: 0,
	type: POKEMON_TYPES.NORMAL,
	triggerSpecial: "morphing",
	triggerSpecialDelay: 1000,
};
