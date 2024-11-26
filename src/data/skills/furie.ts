import { type AOESkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const FURIE: AOESkill = {
	ref: "furie",
	type: POKEMON_TYPES.NORMAL,
	attackRange: 9,
	effect: EFFECTS.FURIE,
	behavior: SkillBehavior.AREA_OF_EFFECT,
	getTilesImpacted() {
		return [];
	},
	power: 0,
	hitDelay: 0,
	selfAlteration: {
		type: AlterationType.FURIE,
		stacks: 1,
		keepStacks: true,
	},
};
