import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const PIQURE: HitSkill = {
	name: "Piqure",
	type: POKEMON_TYPES.INSECTE,
	effect: EFFECTS.PIQURE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 100,
	power: 60,
	rotateSprite: true,
	attackRange: 1,
	chargeDelta: 10,
};
