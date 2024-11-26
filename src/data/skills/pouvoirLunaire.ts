import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const POUVOIR_LUNAIRE: HitSkill = {
	ref: "pouvoir_lunaire",
	type: POKEMON_TYPES.FEE,
	effect: EFFECTS.POUVOIR_LUNAIRE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 200,
	power: 120,
	rotateSprite: false,
	attackRange: 4,
};
