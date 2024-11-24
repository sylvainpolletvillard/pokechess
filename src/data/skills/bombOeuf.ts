import { type AOESkill, SkillBehavior } from "../../logic/skill";
import type { PokemonOnBoard } from "../../objects/pokemon";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const BOMB_OEUF: AOESkill = {
	name: "Bomb Oeuf",
	description:
		"Lance un oeuf explosif infligeant des dégâts dans une large zone",
	type: POKEMON_TYPES.NORMAL,
	attackRange: 4,
	behavior: SkillBehavior.AREA_OF_EFFECT,
	getTilesImpacted(attacker: PokemonOnBoard, target: PokemonOnBoard) {
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
	power: 200,
	effect: EFFECTS.BOMB_OEUF,
	hitDelay: 1000,
	hitEffect: EFFECTS.BOMB_OEUF_HIT,
};
