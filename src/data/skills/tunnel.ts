import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const TUNNEL: SpecialSkill = {
	ref: "tunnel",
	attackRange: 9,
	effect: EFFECTS.TUNNEL,
	behavior: SkillBehavior.SPECIAL,
	power: 100,
	type: POKEMON_TYPES.SOL,
	triggerSpecial: "tunnel",
	hitDelay: 500,
};
