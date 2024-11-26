import { type AOESkill, SkillBehavior } from "../../logic/skill";
import type { PokemonOnBoard } from "../../objects/pokemon";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const BALAYAGE: AOESkill = {
	ref: "balayage",
	attackRange: 1,
	behavior: SkillBehavior.AREA_OF_EFFECT,
	type: POKEMON_TYPES.COMBAT,
	getTilesImpacted(attacker: PokemonOnBoard, target: PokemonOnBoard) {
		const [i, j] = [target.x, target.y];
		return target.x === attacker.x
			? [
					[i - 1, j],
					[i, j],
					[i + 1, j],
				] // horizontal slash
			: [
					[i, j - 1],
					[i, j],
					[i, j + 1],
				]; // vertical slash
	},
	effect: EFFECTS.BALAYAGE,
	power: 100,
	hitDelay: 100,
	rotateSprite: true,
};
