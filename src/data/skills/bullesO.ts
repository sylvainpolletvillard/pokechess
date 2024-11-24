import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const BULLES_D_O: ProjectileSkill = {
	name: "Bulles d'O",
	type: POKEMON_TYPES.EAU,
	effect: EFFECTS.BULLES_D_O,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 2,
	attackRange: 3,
	power: 65,
	projectileRadius: 8,
	rotateProjectile: false,
	hitEffect: EFFECTS.BULLES_D_O_HIT,
};
