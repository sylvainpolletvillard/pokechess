import { type AOESkill, SkillBehavior } from "../../logic/skill";
import type { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const ACIDE: AOESkill = {
	ref: "acide",
	type: POKEMON_TYPES.POISON,
	attackRange: 3,
	behavior: SkillBehavior.AREA_OF_EFFECT,
	getTilesImpacted(attacker: PokemonOnBoard, target: PokemonOnBoard) {
		const [i, j] = [target.x, target.y];
		return [
			[i - 1, j],
			[i, j],
			[i + 1, j],
		];
	},
	power: 40,
	effect: EFFECTS.ACIDE,
	hitDelay: 500,
	hitEffect: EFFECTS.ACIDE_HIT,
	hitAlteration: { type: AlterationType.ACIDE, stacks: 100 },
};
