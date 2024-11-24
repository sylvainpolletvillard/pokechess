import { type ProjectileSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const TRIPLATTAQUE: ProjectileSkill = {
	name: "Triplattaque",
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.TRIPLATTAQUE,
	behavior: SkillBehavior.PROJECTILE,
	travelSpeed: 3,
	attackRange: 3,
	power: 65,
	projectileRadius: 7,
	rotateProjectile: true,
	hitEffect: EFFECTS.TRIPLATTAQUE_HIT,
	get hitAlteration() {
		const rand = Math.random();
		if (rand < 1 / 15) return { type: AlterationType.PARALYSIE, stacks: 15 };
		else if (rand < 2 / 15) return { type: AlterationType.BRULURE, stacks: 15 };
		else if (rand < 3 / 15) return { type: AlterationType.GEL, stacks: 15 };
		return undefined;
	},
};
