import { Z } from "../data/depths";
import type GameScene from "../scenes/GameScene";
import type { PokemonOnBoard } from "./pokemon";

const BAR_WIDTH = 16;

export function updatePokemonBars(pokemon: PokemonOnBoard, game: GameScene) {
	const graphics = game.objects.get("bars_" + pokemon.uid);
	const sprite = game.sprites.get(pokemon.uid);
	if (sprite != null && graphics != null) {
		graphics.setDepth(Z.POKEMON_BARS);
		graphics.clear();
		graphics.fillStyle(0x000000, 1);
		const ox = sprite.x - BAR_WIDTH / 2,
			oy = sprite.y - 16;
		graphics.fillRect(ox, oy, BAR_WIDTH, 2);
		graphics.fillStyle(pokemon.owner === 1 ? 0x30ff30 : 0xff3030, 1);
		graphics.fillRect(
			ox,
			oy,
			Math.ceil((pokemon.pv / pokemon.maxPV) * BAR_WIDTH),
			1,
		);
		graphics.fillStyle(0x0070ff, 1);
		graphics.fillRect(
			ox,
			oy + 1,
			Math.ceil((pokemon.pp / pokemon.entry.maxPP) * BAR_WIDTH),
			1,
		);
	}
}
