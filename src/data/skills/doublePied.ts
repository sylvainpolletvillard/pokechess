import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const DOUBLE_PIED: HitSkill = {
	ref: "double_pied",
	type: POKEMON_TYPES.COMBAT,
	effect: EFFECTS.DOUBLE_PIED,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 150,
	power: 40,
	rotateSprite: false,
	attackRange: 1,
	chargeDelta: 4,
};
