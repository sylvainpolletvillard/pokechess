import {PokemonTypeAction} from "../data/pokemons";
import {findClosestReachableTarget, findPathToTarget} from "./pathfinding";
import {Board,getPositionFromCoords} from "./board";
import Game from "../scenes/GameScene";
import {getDirection} from "./anims";
import Phaser from "phaser";
import {PokemonOnBoard} from "../objects/pokemon";
import {GameStage, gameState} from "./gamestate";
import GameScene from "../scenes/GameScene";
import { Skill } from "./skill";
import { canPokemonBeTargeted, hasBlockingAlteration } from "./alteration";
import { renderAttack } from "./skill-anims";
import { AlterationType } from "../data/alterations";
import { clamp } from "../utils/helpers";

export function canPokemonAttack(pokemon: PokemonOnBoard, target: PokemonOnBoard){
    const distance = Phaser.Math.Distance.Snake(pokemon.x, pokemon.y, target.x, target.y)
    const isInAttackRange = (
        distance <= pokemon.baseSkill.attackRange 
        || (pokemon.ppSkill && pokemon.pp >= pokemon.maxPP && distance <= pokemon.ppSkill.attackRange)
    )
    const hasBlockingAlterations = pokemon.alterations.some(alt => [
        AlterationType.GEL,
        AlterationType.PEUR,
        AlterationType.SOMMEIL
    ].includes(alt.type))

    return isInAttackRange && !hasBlockingAlterations
}

export function canPokemonMove(pokemon: PokemonOnBoard){
    return !pokemon.alterations.some(alt => [
        AlterationType.GEL,
        AlterationType.LIGOTAGE,
        AlterationType.SOMMEIL
    ].includes(alt.type))
}

export function updatePokemonAction(pokemon: PokemonOnBoard, board: Board, game: Game){
    if(pokemon.nextAction.type !== PokemonTypeAction.IDLE || pokemon.pv <= 0) return;

    if(hasBlockingAlteration(pokemon)) return;

    const targetCandidates = (pokemon.owner === 1 ? board.otherTeam : board.playerTeam)
        .filter(candidate => canPokemonBeTargeted(candidate))
    
    const target = pokemon.nextAction.target || findClosestReachableTarget(pokemon, targetCandidates)
    if(target == null){
        pokemon.nextAction = { type: PokemonTypeAction.IDLE }
    } else {        
        if(canPokemonAttack(pokemon, target)){
            attackTarget(pokemon, target, board, game)
        } else if(canPokemonMove(pokemon)) {
            moveToTarget(pokemon, target, board, game)
        }
    }
}

export function faceTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard, game: Game){
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    pokemon.facingDirection = getDirection(target.x - pokemon.x, target.y - pokemon.y)
    sprite.play(`${pokemon.ref}_${pokemon.facingDirection}`)
}

export function moveToTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard, board: Board, game: Game){
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    const path = findPathToTarget(pokemon, target, gameState.board)
    //console.log(`${pokemon.name} va vers ${target.name}`, path)
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

    const attackSpeed = 5000000 / (pokemon.speed+25) / game.gameSpeed
    pokemon.nextAction = { type: PokemonTypeAction.ATTACK, target };
    faceTarget(pokemon, target, game);
    game.time.addEvent({
        delay: attackSpeed,
        callback: () => {
            pokemon.nextAction = { type: PokemonTypeAction.IDLE }
            if(pokemon.pv === 0) return // pokemon died while preparing attack
            if(target.pv > 0){ // if target is not already dead by another attack
                pokemon.facingDirection = getDirection(target.x - pokemon.x, target.y - pokemon.y)
                pokemon.pp = Math.min(pokemon.maxPP, pokemon.pp + 1);
                //console.log(`${pokemon.name} (${pokemon.x},${pokemon.y}) is targeting ${target.name} (${target.x},${target.y}) → ${pokemon.facingDirection}`)
                faceTarget(pokemon, target, game);
                renderAttack(pokemon, target, game)
                pokemon.nextAction.target = target // prevent changing target
            }            
        }
    })
}

export function applyDamage(damage: number, target: PokemonOnBoard, noPPGain=false){
    target.pv = Math.max(0, target.pv - damage)
    if(!noPPGain) target.pp = Math.min(target.maxPP, target.pp + clamp(damage/target.maxPV * 25, 2, 5))
    if(target.pv === 0) killPokemon(target)
    else {
        const sommeil = target.alterations.find(alt => alt.type === AlterationType.SOMMEIL)
        if(sommeil){ 
            sommeil.stacks -= Math.ceil((damage/target.maxPV)*100);
            console.log("reducing stacks to "+sommeil.stacks, Math.ceil(damage*10)) 
        }
    }
}

export function calcDamage(skill: Skill, target: PokemonOnBoard, attacker: PokemonOnBoard){
    return attacker.attack * (1+skill.power/100) / target.defense
    // TODO: gérer les types de damage eau/feu plus ou moins efficaces
}

export function killPokemon(pokemon: PokemonOnBoard){
    const board = gameState.board;
    const team = pokemon.owner === 1 ? board.playerTeam : board.otherTeam;
    const index = team.indexOf(pokemon)

    if(index === -1) return; // already dead
        
    sendBackToPokeball(pokemon)
    team.splice(index, 1)

    if(team.length === 0 && gameState.stage === GameStage.FIGHT){
        gameState.endFight(pokemon.owner)
    }
}

export function sendBackToPokeball(pokemon: PokemonOnBoard){
    const game = gameState.activeScene as GameScene;
    const sprite = game.sprites.get(pokemon.uid)

    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    const pokeball = game.add.sprite(sprite.x, sprite.y, "pokeball");
    pokeball.play(`${pokemon.pokeball}_in`)
    pokeball.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        pokeball.destroy()
    })

    sprite.destroy();
    pokemon.alterations.filter(alt => alt.effectSprite).forEach(alt => alt.effectSprite?.destroy())
    game.sprites.delete(pokemon.uid)

    const bars = game.graphics.get(pokemon.uid)
    if(bars != null){
        bars.destroy();
        game.graphics.delete(pokemon.uid);
    }
}