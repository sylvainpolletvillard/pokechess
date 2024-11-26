import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const PROVOC: SpecialSkill = {
	ref: "provoc",
	attackRange: 9,
	effect: EFFECTS.PROVOCATION,
	behavior: SkillBehavior.SPECIAL,
	power: 0,
	type: POKEMON_TYPES.COMBAT,
	triggerSpecial: "provoc",
};
