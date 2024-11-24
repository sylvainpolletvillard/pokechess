import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const CHARGE: HitSkill = {
	name: "Charge",
	type: POKEMON_TYPES.NORMAL,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 150,
	hitEffect: EFFECTS.CHARGE_HIT,
	chargeDelta: 12,
	power: 40,
	rotateSprite: false,
	attackRange: 1,
};
