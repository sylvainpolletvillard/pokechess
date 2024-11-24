import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const EMPAL_KORNE: HitSkill = {
	name: "Empal'Korne",
	description: "Empale la cible avec une stalagmite surgissant du sol",
	type: POKEMON_TYPES.SOL,
	effect: EFFECTS.EMPAL_KORNE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 400,
	power: 120,
	rotateSprite: false,
	triggerAlteration: { type: AlterationType.TOURBILLON, stacks: 14 },
	attackRange: 2,
};
