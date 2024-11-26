import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const CASCADE: HitSkill = {
	ref: "cascade",
	type: POKEMON_TYPES.EAU,
	effect: EFFECTS.CASCADE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 500,
	power: 220,
	rotateSprite: false,
	attackRange: 1,
	knockback: true,
};
