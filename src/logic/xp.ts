import { NO_OWNER } from "../data/owners";
import type { Pokemon } from "../data/pokemons";

export function levelToXP(level: number) {
	return level ** 3;
}

export function xpToLevel(xp: number) {
	return Math.floor(Math.pow(xp + 0.1, 1 / 3));
}

export function calcXpEarnedOnDefeat(pokemon: Pokemon) {
	const wildFactor = pokemon.owner === NO_OWNER ? 1 : 1.5;
	return wildFactor * pokemon.baseXP * pokemon.level;
}
