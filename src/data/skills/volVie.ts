import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const VOL_VIE: HitSkill = {
	ref: "vol_vie",
	type: POKEMON_TYPES.PLANTE,
	effect: EFFECTS.VOL_VIE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 400,
	chargeDelta: 0,
	power: 20,
	rotateSprite: true,
	selfAlteration: { type: AlterationType.SOIN, stacks: 10 },
	attackRange: 3,
};
