import {
	type ProjectileSkill,
	SkillBehavior,
	type SpecialSkill,
} from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const BLIZZARD: SpecialSkill = {
	ref: "blizzard",
	attackRange: 9,
	effect: EFFECTS.BLIZZARD,
	behavior: SkillBehavior.SPECIAL,
	hitDelay: 100,
	power: 200,
	type: POKEMON_TYPES.GLACE,
	triggerSpecial: "blizzard",
};

export const BLIZZARD_GRELON: ProjectileSkill = {
	ref: "blizzard",
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
