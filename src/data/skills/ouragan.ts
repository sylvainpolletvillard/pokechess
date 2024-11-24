import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const OURAGAN: ProjectileSkill = {
	name: "Ouragan",
	description: `Une tornade soulevant tous les adversaires sur son passage`,
	type: POKEMON_TYPES.DRAGON,
	effect: EFFECTS.OURAGAN,
	behavior: SkillBehavior.PROJECTILE,
	power: 120,
	travelSpeed: 2,
	pierceThrough: true,
	projectileRadius: 12,
	rotateProjectile: false,
	attackRange: 4,
	hitAlteration: { type: AlterationType.TOURBILLON, stacks: 15 },
};
