import type GameScene from "../scenes/GameScene";

import { Z } from "../data/depths";
import { GameStage, gameState } from "../logic/gamestate";
import { tweenPop } from "../utils/tweens";
import { updatePokemonBars } from "./pokemonBar";

export function updateGUI(game: GameScene) {
	if (gameState.stage === GameStage.FIGHT) {
		for (const pokemon of gameState.board.playerTeam) {
			updatePokemonBars(pokemon, game);
		}
		for (const pokemon of gameState.board.otherTeam) {
			updatePokemonBars(pokemon, game);
		}
	}
}

export function showCenterText(animName: string, game: GameScene) {
	const text = game.add.sprite(
		game.scale.width / 2,
		game.scale.height / 2,
		"texts",
	);
	text.setDepth(Z.CENTER_TEXT).play(animName);
	game.sprites.set("centerText", text);
	return tweenPop(game, text, 500);
}
