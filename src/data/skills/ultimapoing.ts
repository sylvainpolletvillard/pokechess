import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ULTIMAPOING: HitSkill = {
	ref: "ultimapoing",
	type: POKEMON_TYPES.COMBAT,
	effect: EFFECTS.ULTIMAPOING,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 100,
	power: 250,
	rotateSprite: false,
	attackRange: 1,
	chargeDelta: 12,
};
