import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const POUVOIR_LUNAIRE: HitSkill = {
	name: "Pouvoir Lunaire",
	description: "Inflige des dégâts de type Fée à une cible à distance",
	type: POKEMON_TYPES.FEE,
	effect: EFFECTS.POUVOIR_LUNAIRE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 200,
	power: 120,
	rotateSprite: false,
	attackRange: 4,
};
