import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const JET_PIERRES: ProjectileSkill = {
	name: "Jet-Pierres",
	type: POKEMON_TYPES.ROCHE,
	effect: EFFECTS.JET_PIERRES,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 6,
	power: 50,
	projectileRadius: 5,
	hitEffect: EFFECTS.JET_PIERRES_HIT,
	rotateProjectile: false,
	attackRange: 3,
};
