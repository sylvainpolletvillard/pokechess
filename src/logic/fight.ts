import {PokemonTypeAction} from "../data/pokemons";
import {findClosestReachableTarget, findPathToTarget} from "./pathfinding";
import {Board,getPositionFromCoords} from "./board";
import Game from "../scenes/GameScene";
import {faceTarget, getDirection, renderAttack} from "./anims";
import Phaser from "phaser";
import {PokemonOnBoard} from "../objects/pokemon";
import {gameState} from "./gamestate";

export function updatePokemonAction(pokemon: PokemonOnBoard, board: Board, game: Game){
    if(pokemon.nextAction.type !== PokemonTypeAction.IDLE || pokemon.pv <= 0) return;

    const target = findClosestReachableTarget(pokemon, pokemon.owner === 1 ? board.otherTeam : board.playerTeam)
    if(target == null){
        pokemon.nextAction = { type: PokemonTypeAction.IDLE }
    } else {
        const distance = Phaser.Math.Distance.Snake(pokemon.x, pokemon.y, target.x, target.y)
        if(distance <= pokemon.attackRange){
            attackTarget(pokemon, target, board, game)
        } else {
            moveToTarget(pokemon, target, board, game)
        }
    }
}

export function moveToTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard, board: Board, game: Game){
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    const path = findPathToTarget(pokemon, target, gameState.board)
    console.log(`${pokemon.name} va vers ${target.name}`, path)
    pokemon.nextAction = { type: PokemonTypeAction.MOVE, path }

    // PATH >= 3 → pokemon tile + target tile + at least one free tile to move
    if(pokemon.nextAction.path && pokemon.nextAction.path.length >= 3){
        const [nextX,nextY] = pokemon.nextAction.path[1]
        const [sceneX,sceneY] = getPositionFromCoords(nextX,nextY);

        pokemon.facingDirection = getDirection(nextX - pokemon.x, nextY - pokemon.y)
        sprite.play(`${pokemon.ref}_${pokemon.facingDirection}`)
        pokemon.x = nextX;
        pokemon.y = nextY;
        const duration = 3000000 / (pokemon.speed+20) / game.gameSpeed
        game.tweens.add({
            targets: sprite,
            x: sceneX,
            y: sceneY,
            duration,
            ease: 'Linear'
        });
        game.time.addEvent({
            delay: duration,
            callback: () => { pokemon.nextAction = { type: PokemonTypeAction.IDLE } }
        })
    } else {
        // Pokemon is already at range to attack
        pokemon.nextAction = { type: PokemonTypeAction.IDLE }
    }
}

export function attackTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard, board: Board, game: Game){
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    const attackSpeed = 5000000 / (pokemon.speed+20) / game.gameSpeed
    pokemon.nextAction = { type: PokemonTypeAction.ATTACK, target };
    faceTarget(pokemon, target, game);
    game.time.addEvent({
        delay: attackSpeed,
        callback: () => {
            if(pokemon.pv === 0) return // pokemon died while preparing attack
            if(target.pv > 0){ // if target is not already dead by another attack
                pokemon.facingDirection = getDirection(target.x - pokemon.x, target.y - pokemon.y)
                pokemon.pp = Math.min(pokemon.maxPP, pokemon.pp + 1);
                renderAttack(pokemon, target, game);
                //console.log(`${pokemon.name} (${pokemon.x},${pokemon.y}) is targeting ${target.name} (${target.x},${target.y}) → ${pokemon.facingDirection}`)
                const damage = calcDamage(pokemon, target)
                //console.log(`${pokemon.name} is attacking ${target.name}  for ${damage} damage !`)
                target.pv = Math.max(0, target.pv - damage)
                target.pp = Math.min(target.maxPP, target.pp + 2);
                if(target.pv === 0) killPokemon(target, board, game)
            }
            pokemon.nextAction = { type: PokemonTypeAction.IDLE }
        }
    })

}

export function calcDamage(pokemon: PokemonOnBoard, target: PokemonOnBoard){
    return Math.ceil(pokemon.attack * 10 / target.defense) // 10 is the base attack power, to adjust
    // TODO: gérer les types de damage eau/feu plus ou moins efficaces
}


export function killPokemon(pokemon: PokemonOnBoard, board: Board, game: Game){
    const team = pokemon.owner === 1 ? board.playerTeam : board.otherTeam;
    const index = team.indexOf(pokemon)
    const sprite = game.sprites.get(pokemon.uid)
    if(index === -1) return console.error(`Error killPokemon: pokemon ${pokemon.uid} not found in team ${pokemon.owner}`)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    const pokeball = game.add.sprite(sprite.x, sprite.y, "pokeball");
    pokeball.play(`${pokemon.pokeball}_in`)
    pokeball.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        pokeball.destroy()
    })

    team.splice(index, 1)
    sprite.destroy();
    game.sprites.delete(pokemon.uid)

    const bars = game.graphics.get(pokemon.uid)
    if(bars != null){
        bars.destroy();
        game.graphics.delete(pokemon.uid);
    }

    if(team.length === 0){
        gameState.endFight(pokemon.owner, game)
    }
}
