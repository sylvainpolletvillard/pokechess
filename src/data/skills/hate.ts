import { type AOESkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const HATE: AOESkill = {
	ref: "hate",
	attackRange: 9,
	behavior: SkillBehavior.AREA_OF_EFFECT,
	type: POKEMON_TYPES.PSY,
	getTilesImpacted() {
		return [];
	},
	effect: EFFECTS.HATE,
	power: 0,
	hitDelay: 0,
	selfAlteration: {
		type: AlterationType.HATE,
		stacks: 1,
		keepStacks: true,
	},
};
