import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ABRI: SpecialSkill = {
	ref: "abri",
	attackRange: 9,
	behavior: SkillBehavior.SPECIAL,
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.ABRI,
	power: 0,
	hitDelay: 0,
	selfAlteration: {
		type: AlterationType.INVULNERABLE,
		stacks: 20,
	},
};
