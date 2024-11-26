import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ECLAIR: SpecialSkill = {
	ref: "eclair",
	type: POKEMON_TYPES.ELECTRIQUE,
	behavior: SkillBehavior.SPECIAL,
	attackRange: 9,
	power: 250,
	effect: EFFECTS.ECLAIR,
	triggerSpecial: "eclair",
};
