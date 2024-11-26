import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const TELEPORT: SpecialSkill = {
	ref: "teleport",
	attackRange: 9,
	effect: EFFECTS.TELEPORT,
	behavior: SkillBehavior.SPECIAL,
	power: 0,
	type: POKEMON_TYPES.PSY,
	triggerSpecial: "teleport",
};
