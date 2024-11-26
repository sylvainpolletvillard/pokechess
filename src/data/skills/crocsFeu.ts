import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const CROCS_FEU: HitSkill = {
	ref: "crocs_feu",
	type: POKEMON_TYPES.FEU,
	effect: EFFECTS.CROCS_FEU,
	behavior: SkillBehavior.DIRECT_HIT,
	power: 100,
	hitDelay: 200,
	hitAlteration: { type: AlterationType.BRULURE, stacks: 100 },
	rotateSprite: false,
	attackRange: 1,
	chargeDelta: 10,
};
