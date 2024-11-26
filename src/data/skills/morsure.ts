import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const MORSURE: HitSkill = {
	ref: "morsure",
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.MORSURE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 140,
	power: 50,
	rotateSprite: false,
	attackRange: 1,
	chargeDelta: 10,
};
