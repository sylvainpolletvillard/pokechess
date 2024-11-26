import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { POKEMON_TYPES } from "../types";

export const ULTRALASER: SpecialSkill = {
	ref: "ultralaser",
	type: POKEMON_TYPES.DRAGON,
	behavior: SkillBehavior.SPECIAL,
	attackRange: 1,
	power: 200,
	triggerSpecial: "ultralaser",
};
