import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const DRACOCHARGE: ProjectileSkill = {
	ref: "dracocharge",
	type: POKEMON_TYPES.DRAGON,
	effect: EFFECTS.DRACOCHARGE,
	hitEffect: EFFECTS.BULLES_D_O_HIT,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 8,
	projectileRadius: 6,
	rotateProjectile: true,
	power: 50,
	attackRange: 3,
};
