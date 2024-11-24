import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const POING_KARATE: HitSkill = {
	name: "Poing Karaté",
	type: POKEMON_TYPES.COMBAT,
	effect: EFFECTS.POING_KARATE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 10,
	power: 50,
	rotateSprite: false,
	attackRange: 1,
	chargeDelta: 8,
};
