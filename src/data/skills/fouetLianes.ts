import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const FOUET_LIANES: HitSkill = {
	ref: "fouet_lianes",
	type: POKEMON_TYPES.PLANTE,
	effect: EFFECTS.FOUET_LIANES,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 250,
	power: 45,
	rotateSprite: true,
	attackRange: 1,
};
