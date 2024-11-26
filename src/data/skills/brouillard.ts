import { type AOESkill, SkillBehavior } from "../../logic/skill";
import type { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const BROUILLARD: AOESkill = {
	ref: "brouillard",
	attackRange: 1,
	behavior: SkillBehavior.AREA_OF_EFFECT,
	type: POKEMON_TYPES.NORMAL,
	getTilesImpacted(attacker: PokemonOnBoard) {
		const [i, j] = [attacker.x, attacker.y];
		return [
			[i - 1, j - 1],
			[i, j - 1],
			[i + 1, j - 1],
			[i - 1, j],
			[i + 1, j],
			[i - 1, j + 1],
			[i, j + 1],
			[i + 1, j + 1],
		];
	},
	effect: EFFECTS.BROUILLARD,
	power: 0,
	hitDelay: 200,
	hitAlteration: {
		type: AlterationType.AVEUGLE,
		stacks: 50,
	},
};
