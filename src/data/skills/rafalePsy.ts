import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const RAFALE_PSY: ProjectileSkill = {
	ref: "rafale_psy",
	type: POKEMON_TYPES.PSY,
	effect: EFFECTS.RAFALE_PSY,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 6,
	projectileRadius: 16,
	pierceThrough: true,
	rotateProjectile: true,
	power: 100,
	attackRange: 4,
};
