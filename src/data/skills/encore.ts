import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ENCORE: SpecialSkill = {
	ref: "encore",
	attackRange: 9,
	effect: EFFECTS.ENCORE,
	behavior: SkillBehavior.SPECIAL,
	power: 0,
	type: POKEMON_TYPES.NORMAL,
	triggerSpecial: "encore",
};
