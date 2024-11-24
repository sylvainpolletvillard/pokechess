import { OWNER_PLAYER } from "../data/owners";
import { DRESSEUR_PENSION_DIALOG_STATE } from "../data/trainers";
import type { PokemonOnBoard } from "../objects/pokemon";
import { removeInArray } from "../utils/helpers";
import { gameState } from "./gamestate";
import { xpToLevel } from "./xp";

export function addToPension(pokemon: PokemonOnBoard) {
	gameState.pension.push(pokemon);
	gameState.dialogStates["pension"] = DRESSEUR_PENSION_DIALOG_STATE.has_deposed;
}

export function removeFromPension(pokemon: PokemonOnBoard) {
	removeInArray(gameState.pension, pokemon);
	if (!gameState.pension.some((pkm) => pkm.owner === OWNER_PLAYER)) {
		gameState.dialogStates["pension"] = DRESSEUR_PENSION_DIALOG_STATE.has_met;
	}
}

export function raisePokemonsPension() {
	for (const pokemon of gameState.pension) {
		pokemon.xp += gameState.day * 100;
		pokemon.level = xpToLevel(pokemon.xp);
		pokemon.pv = pokemon.maxPV;
	}
}
