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
import { removeInArray, wait } from '../utils/helpers';

import { playSound } from './audio';
import { getAlliancesState } from './player';
import { updateCursorHover } from '../objects/cursor';
import { OWNER_PLAYER } from '../data/owners';
import { startDialog } from './dialog';
import { closeMenu } from '../objects/menu';
import { cancelPokemonDrag } from './board';

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

    wait(0).then(() => updateCursorHover(game))
}

export function addToTeam(pokemon: PokemonOnBoard){
    pokemon.owner = OWNER_PLAYER;
    gameState.board.playerTeam.push(pokemon)
    gameState.player.team.push(pokemon)
    if(gameState.activeScene instanceof GameScene){
        gameState.board.playerAlliances = getAlliancesState(gameState.board.playerTeam)
        drawAlliancesInfo(gameState.board.playerTeam)
    }    
}

export function removeFromTeam(pokemon: PokemonOnBoard, team: PokemonOnBoard[]){
    removeInArray(team, pokemon)
    if(team === gameState.board.playerTeam){
        removeInArray(gameState.player.team, pokemon)
        gameState.board.playerAlliances = getAlliancesState(gameState.board.playerTeam)
        drawAlliancesInfo(gameState.board.playerTeam)
    }
}

export function releasePokemon(pokemon: Pokemon){
    const game = gameState.activeScene as GameScene
    return startDialog([
        `Relâcher ${pokemon.entry.name} et récupérer ${pokemon.cost} Pokéball ?`,
        {
            "Non"(){
                addToBox(pokemon);
                return false;
            },
            "Oui"(){
                if(pokemon instanceof PokemonOnBoard){
                    removeFromTeam(pokemon, gameState.board.playerTeam)
                } else {
                    removeFromBox(pokemon)
                }
                game.sprites.get(pokemon.uid)?.destroy()
                playSound(getPokemonCry(pokemon.entry))
                gameState.player.inventory[ITEM_POKEBALL.ref] += pokemon.cost;
                drawPokeballsCounter()
            }
        }
    ])   
}