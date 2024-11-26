import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { POKEMON_TYPES } from "../types";

export const LASER_GLACE: SpecialSkill = {
	ref: "laser_glace",
	type: POKEMON_TYPES.GLACE,
	behavior: SkillBehavior.SPECIAL,
	attackRange: 1,
	power: 80,
	triggerSpecial: "laser_glace",
};
