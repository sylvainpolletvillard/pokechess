import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const LECHOUILLE: HitSkill = {
	name: "Léchouille",
	type: POKEMON_TYPES.SPECTRE,
	effect: EFFECTS.LECHOUILLE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 200,
	hitAlteration: { type: AlterationType.PARALYSIE, stacks: 20 },
	power: 35,
	rotateSprite: true,
	attackRange: 1,
};
