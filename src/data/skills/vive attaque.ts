import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const VIVE_ATTAQUE: HitSkill = {
	ref: "vive_attaque",
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.VIVE_ATTAQUE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 20,
	power: 40,
	rotateSprite: true,
	attackRange: 1,
	chargeDelta: 10,
};
