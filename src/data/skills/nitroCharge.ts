import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const NITROCHARGE: HitSkill = {
	ref: "nitrocharge",
	type: POKEMON_TYPES.FEU,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 150,
	hitEffect: EFFECTS.NITROCHARGE_HIT,
	hitAlteration: { type: AlterationType.BRULURE, stacks: 30 },
	chargeDelta: 12,
	power: 100,
	selfDamage: 30,
	rotateSprite: false,
	attackRange: 1,
};
