import {Pokemon} from "../data/pokemons";
import Game from "../scenes/GameScene";
import {gameState} from "./gamestate";
import {addToBoxGroup, removeFromBoxGroup} from "../objects/pokemonBox";
import {PokemonOnBoard} from "../objects/pokemon";
import {drawAlliancesInfo} from "../objects/alliancesInfo";
import {removeInArray} from "../utils/helpers";

export function removeFromBox(pokemon: Pokemon, game: Game){
    const box = gameState.player.box;
    box[box.indexOf(pokemon)] = null;

    const pokemonSprite = game.sprites.get(pokemon.uid)
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
        removeFromTeam(pokemon, game)
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

export function removeFromTeam(pokemon: PokemonOnBoard, game: Game){
    if(pokemon.owner === 1){
        removeInArray(gameState.player.team, pokemon)
        removeInArray(gameState.board.playerTeam, pokemon)
        drawAlliancesInfo(0)
    } else {
        removeInArray(gameState.board.otherTeam, pokemon)
    }
}