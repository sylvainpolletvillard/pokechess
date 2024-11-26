import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const SECRETION: ProjectileSkill = {
	ref: "secretion",
	type: POKEMON_TYPES.INSECTE,
	effect: EFFECTS.SECRETION,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 4,
	attackRange: 4,
	power: 50,
	projectileRadius: 3,
	rotateProjectile: true,
	hitEffect: EFFECTS.SECRETION_HIT,
	hitAlteration: {
		type: AlterationType.SECRETION,
		stacks: 100,
	},
};
