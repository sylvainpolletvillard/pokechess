import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const AMNESIE: SpecialSkill = {
	ref: "amnesie",
	attackRange: 9,
	effect: EFFECTS.AMNESIE,
	behavior: SkillBehavior.SPECIAL,
	power: 0,
	type: POKEMON_TYPES.PSY,
	triggerSpecial: "amnesie",
};
