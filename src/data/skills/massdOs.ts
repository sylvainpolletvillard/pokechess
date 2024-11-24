import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const MASSDOS: ProjectileSkill = {
	name: "Massd'Os",
	type: POKEMON_TYPES.SOL,
	effect: EFFECTS.MASSDOS,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 4,
	power: 65,
	projectileRadius: 5,
	hitEffect: EFFECTS.CHARGE_HIT,
	rotateProjectile: false,
	attackRange: 3,
};
