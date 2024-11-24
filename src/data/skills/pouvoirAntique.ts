import { type AOESkill, SkillBehavior } from "../../logic/skill";
import type { PokemonOnBoard } from "../../objects/pokemon";
import { AlterationType } from "../alterations";
import { EFFECTS } from "../effects";
import { POKEMON_TYPES } from "../types";

export const POUVOIR_ANTIQUE: AOESkill = {
	name: "Pouvoir Antique",
	description:
		"Une attaque préhistorique qui augmente toutes les stats du lanceur",
	attackRange: 1,
	behavior: SkillBehavior.AREA_OF_EFFECT,
	type: POKEMON_TYPES.ROCHE,
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
	effect: EFFECTS.POUVOIR_ANTIQUE,
	power: 60,
	hitDelay: 200,
	selfAlteration: {
		type: AlterationType.POUVOIR_ANTIQUE,
		stacks: 1,
		keepStacks: true,
	},
};
