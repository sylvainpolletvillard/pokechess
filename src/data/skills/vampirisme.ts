import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const VAMPIRISME: HitSkill = {
	ref: "vampirisme",
	type: POKEMON_TYPES.INSECTE,
	effect: EFFECTS.VAMPIRISME,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 150,
	chargeDelta: 0,
	power: 35,
	rotateSprite: true,
	selfAlteration: { type: AlterationType.SOIN, stacks: 5 },
	attackRange: 1,
};
