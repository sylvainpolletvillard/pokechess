import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ECLATS_GLACE: ProjectileSkill = {
	ref: "eclats_glace",
	type: POKEMON_TYPES.GLACE,
	effect: EFFECTS.ECLATS_GLACE,
	hitEffect: EFFECTS.ECLATS_GLACE_HIT,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 5,
	attackRange: 3,
	power: 40,
	projectileRadius: 7,
	rotateProjectile: true,
};
