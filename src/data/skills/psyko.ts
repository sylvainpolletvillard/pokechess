import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const PSYKO: SpecialSkill = {
	name: "Psyko",
	description:
		"Rend confus toute l'équipe adverse pendant 4 secondes avant d'infliger de lourds dégâts Psy",
	attackRange: 9,
	effect: EFFECTS.PSYKO,
	behavior: SkillBehavior.SPECIAL,
	power: 120,
	hitDelay: 4000,
	type: POKEMON_TYPES.PSY,
	triggerSpecial: "psyko",
};
