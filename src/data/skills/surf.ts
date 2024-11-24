import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const SURF: ProjectileSkill = {
	name: "Surf",
	description: "Une vague balayant tout sur son passage",
	type: POKEMON_TYPES.EAU,
	effect: EFFECTS.SURF,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 4,
	projectileRadius: 16,
	pierceThrough: true,
	rotateProjectile: true,
	power: 100,
	attackRange: 9,
	knockback: true,
};
