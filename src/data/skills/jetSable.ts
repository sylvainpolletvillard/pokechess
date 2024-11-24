import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const JET_DE_SABLE: HitSkill = {
	name: "Jet de Sable",
	description:
		"Aveugle l'ennemi et réduit sa précision de 50% pendant 8 secondes",
	type: POKEMON_TYPES.SOL,
	effect: EFFECTS.JET_DE_SABLE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 100,
	power: 10,
	rotateSprite: false,
	attackRange: 1,
	chargeDelta: 4,
	hitAlteration: { type: AlterationType.AVEUGLE, stacks: 80 },
};
