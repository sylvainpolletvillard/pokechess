import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const KOUD_KORNE: HitSkill = {
	ref: "koud_korne",
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.KOUD_KORNE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 100,
	power: 40,
	rotateSprite: true,
	attackRange: 1,
	chargeDelta: 8,
};
