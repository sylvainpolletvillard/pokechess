import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const GUILLOTINE: HitSkill = {
	name: "Guillotine",
	description:
		"Coup mortel exécutant l'adversaire s'il a moins de 30% de ses PV max",
	type: POKEMON_TYPES.NORMAL,
	effect: EFFECTS.GUILLOTINE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 250,
	hitAlteration: { type: AlterationType.EXECUTION, stacks: 1 },
	power: 150,
	rotateSprite: false,
	attackRange: 1,
	chargeDelta: 6,
};
