import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const HYPNOSE: HitSkill = {
	name: "Hypnose",
	description: "Endort profondément la cible",
	type: POKEMON_TYPES.PSY,
	effect: EFFECTS.HYPNOSE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 500,
	hitAlteration: { type: AlterationType.SOMMEIL, stacks: 70 },
	power: 0,
	rotateSprite: false,
	attackRange: 4,
};
