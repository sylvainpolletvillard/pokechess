import { type AOESkill, SkillBehavior } from "../../logic/skill";
import type { PokemonOnBoard } from "../../objects/pokemon";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const MAWASHI_GERI: AOESkill = {
	ref: "mawashi_geri",
	attackRange: 1,
	behavior: SkillBehavior.AREA_OF_EFFECT,
	type: POKEMON_TYPES.COMBAT,
	getTilesImpacted(attacker: PokemonOnBoard, target: PokemonOnBoard) {
		const tiles: [number, number][] = [[target.x, target.y]];
		if (target.x === attacker.x - 1) tiles.push([target.x + 2, target.y]); // attack left
		if (target.x === attacker.x + 1) tiles.push([target.x - 2, target.y]); // attack right
		if (target.y === attacker.y - 1) tiles.push([target.x, target.y + 2]); // attack up
		if (target.y === attacker.y + 1) tiles.push([target.x, target.y - 2]); // attack down
		return tiles;
	},
	effect: EFFECTS.MAWASHI_GERI,
	power: 100,
	hitDelay: 100,
	rotateSprite: true,
};
