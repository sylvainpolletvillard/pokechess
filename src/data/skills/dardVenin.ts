import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const DARD_VENIN: ProjectileSkill = {
	ref: "dard_venin",
	type: POKEMON_TYPES.POISON,
	effect: EFFECTS.DARD_VENIN,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 6,
	power: 30,
	projectileRadius: 5,
	hitEffect: EFFECTS.DARD_VENIN_HIT,
	hitAlteration: { type: AlterationType.POISON, stacks: 30 },
	rotateProjectile: true,
	attackRange: 2,
};
