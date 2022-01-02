import Game from '../scenes/GameScene';
import { addToBoxGroup, removeFromBoxGroup } from '../objects/pokemonBox';
import { drawAlliancesInfo } from '../objects/alliancesInfo';
import { drawPokeballsCounter } from '../objects/pokeballsCounter';
import { gameState } from './gamestate';
import { ITEM_POKEBALL } from '../data/items';
import { MyScene } from '../scenes/MyScene';
import { Pokemon } from '../data/pokemons';
import { PokemonOnBoard } from '../objects/pokemon';
import { removeInArray } from '../utils/helpers';
import { RoomType } from './destination';

export function removeFromBox(pokemon: Pokemon){
    const box = gameState.player.box;
    box[box.indexOf(pokemon)] = null;

    const scene = gameState.activeScene as MyScene;
    const pokemonSprite = scene.sprites.get(pokemon.uid)
    if(gameState.activeMenu?.group
    && gameState.activeMenu.ref === "box"
    && pokemonSprite != null){
        removeFromBoxGroup(pokemonSprite, gameState.activeMenu.group)
    }
}

export function addToBox(pokemon: Pokemon, game: Game, caseIndex?: number){
    if(caseIndex == null){
        caseIndex = gameState.player.box.indexOf(null) // find free case index
    }

    const box = gameState.player.box;
    if(pokemon instanceof PokemonOnBoard){
        // board to box
        removeFromTeam(pokemon)
        pokemon = pokemon.toBoxPokemon(game); // PokemonOnBoard → Pokemon
    } else if(box.includes(pokemon)){
        // switch position in box
        box[box.indexOf(pokemon)] = null
    }
    box[caseIndex] = pokemon

    const pokemonSprite = game.sprites.get(pokemon.uid)
    if(gameState.activeMenu?.ref === "box" && pokemonSprite != null){
        addToBoxGroup(pokemonSprite, caseIndex)
    } else if(pokemonSprite != null){
        pokemonSprite.destroy()
    }
}

export function addToTeam(pokemon: PokemonOnBoard){
    pokemon.owner = 1;
    gameState.board.playerTeam.push(pokemon)
    gameState.player.team.push(pokemon)
    drawAlliancesInfo(0)
}

export function removeFromTeam(pokemon: PokemonOnBoard){
    if(pokemon.owner === 1){
        removeInArray(gameState.player.team, pokemon)
        removeInArray(gameState.board.playerTeam, pokemon)
        drawAlliancesInfo(0)
    } else {
        removeInArray(gameState.board.otherTeam, pokemon)
    }
}

export function releasePokemon(pokemon: Pokemon){
    if(pokemon instanceof PokemonOnBoard){
        removeFromTeam(pokemon)
    } else {
        removeFromBox(pokemon)
    }
    gameState.player.inventory[ITEM_POKEBALL.ref] += pokemon.cost;
    if(gameState.currentRoom.type === RoomType.WILD || gameState.currentRoom.type === RoomType.FREEWALK){
        drawPokeballsCounter(gameState.activeScene as MyScene)
    }
}