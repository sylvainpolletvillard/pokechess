import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const CROCHET_VENIN: HitSkill = {
	ref: "crochet_venin",
	type: POKEMON_TYPES.POISON,
	effect: EFFECTS.CROCHET_VENIN,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 150,
	hitAlteration: { type: AlterationType.POISON, stacks: 10 },
	power: 50,
	rotateSprite: false,
	attackRange: 1,
	chargeDelta: 8,
};
