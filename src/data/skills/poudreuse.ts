import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const POUDREUSE: HitSkill = {
	ref: "poudreuse",
	type: POKEMON_TYPES.GLACE,
	effect: EFFECTS.POUDREUSE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 200,
	power: 40,
	rotateSprite: true,
	attackRange: 1,
	chargeDelta: 2,
};
