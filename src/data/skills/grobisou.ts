import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const GROBISOU: HitSkill = {
	name: "Grobisou",
	description: "Un bisou glacé qui gèle la cible temporairement",
	type: POKEMON_TYPES.PSY,
	effect: EFFECTS.GROBISOU,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 200,
	hitAlteration: { type: AlterationType.GEL, stacks: 80 },
	power: 0,
	rotateSprite: false,
	attackRange: 2,
};
