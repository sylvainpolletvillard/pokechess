import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const DEFLAGRATION: SpecialSkill = {
	ref: "deflagration",
	attackRange: 9,
	effect: EFFECTS.DEFLAGRATION,
	behavior: SkillBehavior.SPECIAL,
	power: 300,
	type: POKEMON_TYPES.FEU,
	triggerSpecial: "deflagration",
	hitDelay: 200,
};
