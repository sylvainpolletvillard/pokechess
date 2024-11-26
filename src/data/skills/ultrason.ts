import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ULTRASON: ProjectileSkill = {
	ref: "ultrason",
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.ULTRASON,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 4,
	projectileRadius: 8,
	pierceThrough: true,
	rotateProjectile: true,
	power: 0,
	hitAlteration: { type: AlterationType.CONFUSION, stacks: 30 },
	attackRange: 2,
};
