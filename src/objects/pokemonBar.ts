import GameScene from "../scenes/GameScene";
import {PokemonOnBoard} from "./pokemon";
import {Z} from "../data/depths";

const BAR_WIDTH = 16;

export function updatePokemonBars(pokemon: PokemonOnBoard, game: GameScene){
    const graphics = game.graphics.get(pokemon.uid)
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite != null && graphics != null){
        graphics.setDepth(Z.POKEMON_BARS)
        graphics.clear()
        graphics.fillStyle(0x000000, 1);
        let ox = sprite.x - BAR_WIDTH/2,
            oy = sprite.y - 16;
        graphics.fillRect(ox, oy, BAR_WIDTH, 2)
        graphics.fillStyle(pokemon.owner === 1 ? 0x00ff00 : 0xff0000, 1);
        graphics.fillRect(ox, oy, Math.ceil(pokemon.pv / pokemon.maxPV * BAR_WIDTH), 1)
        graphics.fillStyle(0x0000ff, 1);
        graphics.fillRect(ox, oy+1, Math.ceil(pokemon.pp / pokemon.entry.maxPP * BAR_WIDTH), 1)
    }
}