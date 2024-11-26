import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const LANCE_FLAMMES: HitSkill = {
	ref: "lance_flammes",
	type: POKEMON_TYPES.FEU,
	effect: EFFECTS.LANCE_FLAMMES,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 300,
	triggerAlteration: { type: AlterationType.BRULURE, stacks: 100 },
	power: 200,
	rotateSprite: true,
	attackRange: 1,
};
