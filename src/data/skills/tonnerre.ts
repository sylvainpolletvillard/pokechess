import { type AOESkill, SkillBehavior } from "../../logic/skill";
import type { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const TONNERRE: AOESkill = {
	ref: "tonnerre",
	attackRange: 1,
	behavior: SkillBehavior.AREA_OF_EFFECT,
	type: POKEMON_TYPES.ELECTRIQUE,
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
	effect: EFFECTS.TONNERRE,
	power: 95,
	hitDelay: 250,
	triggerAlteration: {
		type: AlterationType.PARALYSIE,
		stacks: 10,
	},
};
