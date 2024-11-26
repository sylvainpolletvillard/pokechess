import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const PILONNAGE: ProjectileSkill = {
	ref: "pilonnage",
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.PILONNAGE,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 6,
	power: 30,
	projectileRadius: 6,
	hitEffect: EFFECTS.CHARGE_HIT,
	rotateProjectile: true,
	attackRange: 4,
};
