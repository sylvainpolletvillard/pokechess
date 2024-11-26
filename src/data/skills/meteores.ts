import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const METEORES: ProjectileSkill = {
	ref: "meteores",
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.METEORES,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 4,
	projectileRadius: 8,
	pierceThrough: true,
	rotateProjectile: true,
	power: 50,
	precision: 10,
	attackRange: 9,
};
