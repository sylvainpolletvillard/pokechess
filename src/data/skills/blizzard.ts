import {
	type ProjectileSkill,
	SkillBehavior,
	type SpecialSkill,
} from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const BLIZZARD: SpecialSkill = {
	name: "Blizzard",
	description:
		"Gèle tous les adversaires et fait tomber une pluie de grêlons dévastateurs",
	attackRange: 9,
	effect: EFFECTS.BLIZZARD,
	behavior: SkillBehavior.SPECIAL,
	hitDelay: 100,
	power: 200,
	type: POKEMON_TYPES.GLACE,
	triggerSpecial: "blizzard",
};

export const BLIZZARD_GRELON: ProjectileSkill = {
	name: "Blizzard",
	behavior: SkillBehavior.PROJECTILE,
	effect: EFFECTS.GRELON,
	hitEffect: EFFECTS.GRELON_HIT,
	power: 300,
	travelSpeed: 5,
	rotateProjectile: false,
	projectileRadius: 8,
	type: POKEMON_TYPES.GLACE,
	attackRange: 9,
};
