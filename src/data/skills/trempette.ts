import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const TREMPETTE: SpecialSkill = {
	ref: "trempette",
	behavior: SkillBehavior.SPECIAL,
	type: POKEMON_TYPES.EAU,
	power: 0,
	effect: EFFECTS.TREMPETTE,
	attackRange: 9,
};
