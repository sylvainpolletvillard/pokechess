import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const PICPIC: HitSkill = {
	name: "Picpic",
	type: POKEMON_TYPES.VOL,
	effect: EFFECTS.PICPIC,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 100,
	power: 35,
	rotateSprite: true,
	attackRange: 1,
	chargeDelta: 8,
};
