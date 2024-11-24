import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const AMNESIE: SpecialSkill = {
	name: "Amnésie",
	description: "Soigne toutes les altérations actuelles du lanceur",
	attackRange: 9,
	effect: EFFECTS.AMNESIE,
	behavior: SkillBehavior.SPECIAL,
	power: 0,
	type: POKEMON_TYPES.PSY,
	triggerSpecial: "amnesie",
};
