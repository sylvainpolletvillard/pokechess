import { type HitSkill, SkillBehavior } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const DEVOREVE: HitSkill = {
	name: "Dévorêve",
	description: "Appeure l'adversaire avec des visions de cauchemar",
	type: POKEMON_TYPES.SPECTRE,
	effect: EFFECTS.DEVOREVE,
	behavior: SkillBehavior.DIRECT_HIT,
	hitDelay: 350,
	power: 100,
	rotateSprite: false,
	attackRange: 4,
	hitAlteration: { type: AlterationType.PEUR, stacks: 30 },
};
