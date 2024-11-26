import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const LANCE_SOLEIL: ProjectileSkill = {
	ref: "lance_soleil",
	type: POKEMON_TYPES.PLANTE,
	effect: EFFECTS.LANCE_SOLEIL,
	behavior: SkillBehavior.PROJECTILE,
	power: 120,
	travelSpeed: 2,
	pierceThrough: true,
	projectileRadius: 8,
	hitAlteration: {
		type: AlterationType.BRULURE,
		stacks: 10,
	},
	rotateProjectile: false,
	attackRange: 4,
};
