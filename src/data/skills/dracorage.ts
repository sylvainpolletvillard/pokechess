import { type AOESkill, SkillBehavior } from "../../logic/skill";
import type { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const DRACORAGE: AOESkill = {
	ref: "dracorage",
	attackRange: 2,
	behavior: SkillBehavior.AREA_OF_EFFECT,
	type: POKEMON_TYPES.DRAGON,
	getTilesImpacted(attacker: PokemonOnBoard, target) {
		const [i, j] = [target.x, target.y];
		return [
			[i - 1, j - 1],
			[i, j - 1],
			[i + 1, j - 1],
			[i - 1, j],
			[i, j],
			[i + 1, j],
			[i - 1, j + 1],
			[i, j + 1],
			[i + 1, j + 1],
		];
	},
	effect: EFFECTS.DRACORAGE,
	power: 0,
	hitDelay: 0,
	hitAlteration: {
		type: AlterationType.DAMAGE_OVER_TIME,
		stacks: 30,
	},
};
