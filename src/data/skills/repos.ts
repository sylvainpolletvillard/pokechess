import { SkillBehavior, type SpecialSkill } from "../../logic/skill";
import { AlterationType } from "../alterations";
import { POKEMON_TYPES } from "../types";

export const REPOS: SpecialSkill = {
	ref: "repos",
	attackRange: 9,
	behavior: SkillBehavior.SPECIAL,
	power: 0,
	type: POKEMON_TYPES.NORMAL,
	selfAlteration: { type: AlterationType.REPOS, stacks: 100 },
};
