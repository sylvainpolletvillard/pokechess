import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const METRONOME: SpecialSkill = {
	ref: "metronome",
	attackRange: 9,
	effect: EFFECTS.METRONOME,
	behavior: SkillBehavior.SPECIAL,
	power: 0,
	type: POKEMON_TYPES.NORMAL,
	triggerSpecial: "metronome",
};
