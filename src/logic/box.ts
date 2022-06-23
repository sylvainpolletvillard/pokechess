import { RoomType } from '../types/destination';
import GameScene from '../scenes/GameScene';
import { addToBoxPanel } from '../objects/pokemonBox';
import { drawAlliancesInfo } from '../objects/alliancesInfo';
import { drawPokeballsCounter } from '../objects/pokeballsCounter';
import { gameState } from './gamestate';
import { ITEM_POKEBALL } from '../data/items';
import { MyScene } from '../scenes/MyScene';
import { getPokemonCry, Pokemon } from '../data/pokemons';
import { PokemonOnBoard } from '../objects/pokemon';
import { removeInArray } from '../utils/helpers';

import { playSound } from './audio';
import { getAlliancesState } from './player';

export function removeFromBox(pokemon: Pokemon){
    const box = gameState.player.box;
    box[box.indexOf(pokemon)] = null;

    const scene = gameState.activeScene as MyScene;
    const pokemonSprite = scene.sprites.get(pokemon.uid)
    if(gameState.activeMenu?.container
    && gameState.activeMenu.ref === "box"
    && pokemonSprite != null){
        gameState.activeMenu.container.remove(pokemonSprite)
    }
}

export function addToBox(pokemon: Pokemon, caseIndex?: number){
    const game = gameState.activeScene as GameScene;
    if(caseIndex == null){
        caseIndex = gameState.player.box.indexOf(null) // find free case index
    }

    const box = gameState.player.box;
    if(pokemon instanceof PokemonOnBoard){
        // board to box        
        pokemon = pokemon.toBoxPokemon(game); // PokemonOnBoard → Pokemon
    } else if(box.includes(pokemon)){
        // switch position in box
        box[box.indexOf(pokemon)] = null
    }
    box[caseIndex] = pokemon

    const pokemonSprite = game.sprites.get(pokemon.uid)
    if(gameState.activeMenu?.ref === "box" && pokemonSprite != null){
        addToBoxPanel(pokemonSprite, caseIndex)
    } else if(pokemonSprite != null){
        pokemonSprite.destroy()
    }
}

export function addToTeam(pokemon: PokemonOnBoard){
    pokemon.owner = 1;
    gameState.board.playerTeam.push(pokemon)
    gameState.player.team.push(pokemon)
    if(gameState.activeScene instanceof GameScene){
        gameState.board.playerAlliances = getAlliancesState(gameState.board.playerTeam)
        drawAlliancesInfo(gameState.board.playerTeam)
    }    
}

export function removeFromTeam(pokemon: PokemonOnBoard){
    if(pokemon.owner === 1){
        removeInArray(gameState.player.team, pokemon)
        removeInArray(gameState.board.playerTeam, pokemon)
        gameState.board.playerAlliances = getAlliancesState(gameState.board.playerTeam)
        drawAlliancesInfo(gameState.board.playerTeam)
    } else {
        removeInArray(gameState.board.otherTeam, pokemon)
    }
}

export function releasePokemon(pokemon: Pokemon){
    const game = gameState.activeScene as GameScene
    if(pokemon instanceof PokemonOnBoard){
        removeFromTeam(pokemon)
    } else {
        removeFromBox(pokemon)
    }
    game.sprites.get(pokemon.uid)?.destroy()
    playSound(getPokemonCry(pokemon.entry))
    gameState.player.inventory[ITEM_POKEBALL.ref] += pokemon.cost;
    drawPokeballsCounter()
}