import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const HYDROCANON: HitSkill = {
	ref: "hydrocanon",
	type: POKEMON_TYPES.EAU,
	effect: EFFECTS.HYDROCANON,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 2000,
	power: 300,
	rotateSprite: false,
	triggerAlteration: { type: AlterationType.TOURBILLON, stacks: 30 },
	attackRange: 4,
};
