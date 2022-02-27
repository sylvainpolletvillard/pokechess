import GameScene from '../scenes/GameScene';

import { GameStage, gameState } from '../logic/gamestate';
import { tweenPop } from '../utils/tweens';
import { updatePokemonBars } from './pokemonBar';
import { Z } from '../data/depths';

export function updateGUI(game: GameScene){
    if(gameState.stage === GameStage.FIGHT){
        for (let pokemon of gameState.board.playerTeam) {
            updatePokemonBars(pokemon, game)
        }
        for (let pokemon of gameState.board.otherTeam) {
            updatePokemonBars(pokemon, game)
        }
    }
}

export function showCenterText(animName: string, game: GameScene){
    const text = game.add.sprite(game.scale.width/2, game.scale.height/2, "texts")
    text.setDepth(Z.CENTER_TEXT).play(animName)
    game.sprites.set("centerText", text)
    return tweenPop(game, text, 500);
}