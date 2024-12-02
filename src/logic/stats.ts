import type { PokemonOnBoard } from "../objects/pokemon";
import { gameState } from "./gamestate";

interface Stats {
	pokemons: PokemonOnBoard[];
	damageDone: Map<string, number>;
	damageReceived: Map<string, number>;
	heal: Map<string, number>;
}

let stats: Stats = {
	pokemons: [],
	damageDone: new Map(),
	damageReceived: new Map(),
	heal: new Map(),
};

export function getStats() {
	return stats;
}

export function resetStats() {
	stats = {
		pokemons: gameState.allPokemonsOnBoard,
		damageDone: new Map(),
		damageReceived: new Map(),
		heal: new Map(),
	};
}

export function logStats() {
	//console.log("------ BATTLE STATS ---------");
	//console.log("--- TOTAL DAMAGE ---");
	for (const [uid, damage] of stats.damageDone) {
		const pkm = stats.pokemons.find((p) => p.uid === uid);
		if (!pkm) {
			console.error(`Unknown pokemon UID: ${uid}`);
		}
		//console.log(`${pkm.entry.ref} ${pkm.level} : ${damage}`);
	}

	//console.log("--- DAMAGE RECEIVED ---");
	for (const [uid, damage] of stats.damageReceived) {
		const pkm = stats.pokemons.find((p) => p.uid === uid);
		if (!pkm) {
			console.error(`Unknown pokemon UID: ${uid}`);
		}
		//console.log(`${pkm.entry.ref} ${pkm.level} : ${damage}`);
	}

	//console.log("--- HEAL---");
	for (const [uid, damage] of stats.heal) {
		const pkm = stats.pokemons.find((p) => p.uid === uid);
		if (!pkm) {
			console.error(`Unknown pokemon UID: ${uid}`);
		}
		//console.log(`${pkm.entry.ref} ${pkm.level} : ${damage}`);
	}
}

export function registerDamageDone(pokemon: PokemonOnBoard, amount: number) {
	stats.damageDone.set(
		pokemon.uid,
		(stats.damageDone.get(pokemon.uid) ?? 0) + amount,
	);
}

export function registerDamageReceived(
	pokemon: PokemonOnBoard,
	amount: number,
) {
	stats.damageReceived.set(
		pokemon.uid,
		(stats.damageReceived.get(pokemon.uid) ?? 0) + amount,
	);
}

export function registerHeal(pokemon: PokemonOnBoard, amount: number) {
	stats.heal.set(pokemon.uid, (stats.heal.get(pokemon.uid) ?? 0) + amount);
}
