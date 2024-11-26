import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const BELIER: HitSkill = {
	ref: "belier",
	type: POKEMON_TYPES.NORMAL,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 150,
	hitEffect: EFFECTS.CHARGE_HIT,
	chargeDelta: 12,
	power: 120,
	selfDamage: 30,
	rotateSprite: false,
	attackRange: 1,
};
