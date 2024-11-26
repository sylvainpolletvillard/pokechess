import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const PINCE_MASSE: HitSkill = {
	ref: "pince_masse",
	type: POKEMON_TYPES.EAU,
	effect: EFFECTS.PINCE_MASSE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 100,
	power: 40,
	rotateSprite: false,
	attackRange: 1,
	chargeDelta: 8,
};
