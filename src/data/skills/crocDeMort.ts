import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const CROC_DE_MORT: HitSkill = {
	name: "Croc de Mort",
	description: "Puissante morsure qui apeure la cible pendant 3 secondes",
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.CROC_DE_MORT,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 200,
	hitAlteration: { type: AlterationType.PEUR, stacks: 30 },
	power: 250,
	rotateSprite: false,
	attackRange: 1,
	chargeDelta: 0,
};
