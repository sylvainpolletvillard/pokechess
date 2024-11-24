import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const LIGOTAGE: HitSkill = {
	name: "Ligotage",
	description: "Empêche la cible de bouger et inflige des dégâts sur la durée",
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.LIGOTAGE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 300,
	power: 15,
	rotateSprite: false,
	triggerAlteration: { type: AlterationType.LIGOTAGE, stacks: 120 },
	attackRange: 4,
};
