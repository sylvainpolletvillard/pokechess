import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const PISTOLET_A_O: ProjectileSkill = {
	ref: "pistolet_a_o",
	type: POKEMON_TYPES.EAU,
	effect: EFFECTS.PISTOLET_A_O,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 3,
	power: 40,
	projectileRadius: 3,
	hitEffect: EFFECTS.PISTOLET_A_O_HIT,
	rotateProjectile: false,
	attackRange: 3,
};
