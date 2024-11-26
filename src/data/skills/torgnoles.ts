import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const TORGNOLES: HitSkill = {
	ref: "torgnoles",
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.TORGNOLES,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 10,
	power: 35,
	rotateSprite: false,
	attackRange: 1,
	chargeDelta: 8,
};
