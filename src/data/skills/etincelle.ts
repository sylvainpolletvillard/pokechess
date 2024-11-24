import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ETINCELLE: HitSkill = {
	name: "Etincelle",
	type: POKEMON_TYPES.ELECTRIQUE,
	effect: EFFECTS.ETINCELLE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 100,
	triggerAlteration: { type: AlterationType.PARALYSIE, stacks: 15 },
	power: 65,
	rotateSprite: true,
	attackRange: 1,
	chargeDelta: 4,
};
