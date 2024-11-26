import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const GRIFFE: HitSkill = {
	ref: "griffe",
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.GRIFFE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 100,
	power: 40,
	rotateSprite: true,
	attackRange: 1,
	chargeDelta: 8,
};
