import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const FATAL_FOUDRE: SpecialSkill = {
	ref: "fatal_foudre",
	attackRange: 9,
	effect: EFFECTS.FATAL_FOUDRE,
	behavior: SkillBehavior.SPECIAL,
	power: 200,
	type: POKEMON_TYPES.ELECTRIQUE,
	triggerSpecial: "fatal_foudre",
	hitDelay: 100,
};
