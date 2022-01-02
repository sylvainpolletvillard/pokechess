import Game from '../scenes/GameScene';
import { addInteractiveElem, dragState, handleDragEnd } from './cursor';
import { addText } from '../utils/text';
import { addToBox } from '../logic/box';
import { cancelPokemonDrag } from '../logic/board';
import { closeMenu } from './menu';
import { GameStage, gameState } from '../logic/gamestate';
import { Item } from '../data/items';
import { openBox } from './pokemonBox';
import { openItemMenu } from './itemBox';
import { Pokemon } from '../data/pokemons';
import { RoomArena, RoomType } from '../logic/destination';
import { showPokedex } from './pokedex';
import { startDialog } from '../logic/dialog';
import { tweenPop } from '../utils/tweens';
import { updatePokemonBars } from './pokemonBar';
import { wait } from '../utils/helpers';
import { Z } from '../data/depths';
import { drawTrainers, showTrainerIntro } from './trainers';
import { drawPokeballsCounter } from './pokeballsCounter';
import { drawRoomNamePanel } from './roomNamePanel';

export function updateGUI(game: Game){
    if(gameState.stage === GameStage.FIGHT){
        for (let pokemon of gameState.board.playerTeam) {
            updatePokemonBars(pokemon, game)
        }
        for (let pokemon of gameState.board.otherTeam) {
            updatePokemonBars(pokemon, game)
        }
    }
}

export function drawIntro(game: Game): Promise<any>{
    drawRoomNamePanel()
    drawTrainers(game)

    if(gameState.currentRoom.type === RoomType.WILD){
        return wait(1000).then(() => {
            drawPokeballsCounter(game)
            return showCenterText("text_capture", game)
        })
    }

    if(gameState.currentRoom.type === RoomType.ARENA || gameState.currentRoom.type === RoomType.TUTORIAL){
        const arena = gameState.currentRoom as RoomArena
        showTrainerIntro(arena.trainer, game).then(() => {})
        return wait(2000).then(() => startDialog(arena.trainer.dialogs.start, { speaker: arena.trainer.name }))
    }

    return Promise.resolve()
}

export function showCenterText(animName: string, game: Game){
    const text = game.add.sprite(game.scale.width/2, game.scale.height/2, "texts")
    text.setDepth(Z.CENTER_TEXT).play(animName)
    game.sprites.set("centerText", text)
    return tweenPop(game, text, 500);
}