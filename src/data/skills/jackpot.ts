import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const JACKPOT: SpecialSkill = {
	ref: "jackpot",
	attackRange: 1,
	behavior: SkillBehavior.SPECIAL,
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.JACKPOT_START,
	power: 0,
	triggerSpecial: "jackpot",
	triggerSpecialDelay: 250,
};
