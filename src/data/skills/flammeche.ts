import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const FLAMMECHE: HitSkill = {
	name: "Flammèche",
	type: POKEMON_TYPES.FEU,
	effect: EFFECTS.FLAMMECHE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 100,
	triggerAlteration: { type: AlterationType.BRULURE, stacks: 12 },
	power: 40,
	rotateSprite: true,
	attackRange: 1,
};
