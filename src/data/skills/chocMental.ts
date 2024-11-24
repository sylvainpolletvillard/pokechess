import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const CHOC_MENTAL: ProjectileSkill = {
	name: "Choc mental",
	type: POKEMON_TYPES.PSY,
	effect: EFFECTS.CHOC_MENTAL,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 8,
	projectileRadius: 8,
	rotateProjectile: true,
	power: 50,
	attackRange: 4,
};
