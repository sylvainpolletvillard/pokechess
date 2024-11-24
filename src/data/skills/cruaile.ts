import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const CRUAILE: HitSkill = {
	name: "Cru-Ailes",
	type: POKEMON_TYPES.VOL,
	effect: EFFECTS.CRUAILE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 200,
	power: 60,
	rotateSprite: false,
	attackRange: 1,
	chargeDelta: 4,
};
