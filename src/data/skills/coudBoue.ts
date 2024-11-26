import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const COUD_BOUE: ProjectileSkill = {
	ref: "coud_boue",
	type: POKEMON_TYPES.SOL,
	effect: EFFECTS.COUD_BOUE,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 5,
	attackRange: 3,
	power: 20,
	projectileRadius: 8,
	rotateProjectile: false,
	hitEffect: EFFECTS.COUD_BOUE_HIT,
	hitAlteration: { type: AlterationType.AVEUGLE, stacks: 10 },
};
