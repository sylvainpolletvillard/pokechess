import {PokemonTypeAction} from "../data/pokemons";
import {findClosestReachableTarget, findPathToTarget} from "./pathfinding";
import {Board, getPositionFromCoords} from "./board";
import GameScene from "../scenes/GameScene";
import {getDirection} from "./anims";
import Phaser from "phaser";
import {PokemonOnBoard, removePokemonSprite} from "../objects/pokemon";
import {GameStage, gameState} from "./gamestate";
import {Skill} from "./skill";
import {hasBlockingAlteration} from "./alteration";
import {triggerSkill} from "./skill-anims";
import {AlterationType} from "../data/alterations";
import {clamp} from "../utils/helpers";
import {recordLastSkillSeen} from "./specials";
import {TABLE_TYPES} from "../data/types";

export function canPokemonAttack(pokemon: PokemonOnBoard, target: PokemonOnBoard){
    const distance = Phaser.Math.Distance.Snake(pokemon.x, pokemon.y, target.x, target.y)
    const isInAttackRange = (
        distance <= pokemon.entry.baseSkill.attackRange
        || (pokemon.entry.ppSkill && pokemon.pp >= pokemon.entry.maxPP && distance <= pokemon.entry.ppSkill.attackRange)
    )
    const hasBlockingAlterations = pokemon.hasAlteration(AlterationType.GEL) 
                                || pokemon.hasAlteration(AlterationType.PEUR) 
                                || pokemon.hasAlteration(AlterationType.SOMMEIL)

    return isInAttackRange && !hasBlockingAlterations
}

export function canPokemonMove(pokemon: PokemonOnBoard){
    return !(pokemon.hasAlteration(AlterationType.GEL) 
        || pokemon.hasAlteration(AlterationType.LIGOTAGE)
        || pokemon.hasAlteration(AlterationType.SOMMEIL)
    )
}

export function updatePokemonAction(pokemon: PokemonOnBoard, board: Board, game: GameScene){
    // update Pokémon action only when Pokémon is idle
    if(pokemon.nextAction.type !== PokemonTypeAction.IDLE || pokemon.pv <= 0) return;

    if(hasBlockingAlteration(pokemon)) return;
    
    const target = pokemon.nextAction.target || findClosestReachableTarget(pokemon)
    if(target == null || target.pv <= 0){
        pokemon.resetAction()
    } else {
        if(canPokemonAttack(pokemon, target)){
            attackTarget(pokemon, target, board, game)
        } else if(canPokemonMove(pokemon)) {
            moveToTarget(pokemon, target, board, game)
        }
    }
}

export function faceTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    pokemon.facingDirection = getDirection(target.x - pokemon.x, target.y - pokemon.y)
    sprite.play(`${pokemon.entry.ref}_${pokemon.facingDirection}`)
}

export function moveToTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard, board: Board, game: GameScene){
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    const path = findPathToTarget(pokemon, target, gameState.board)
    //console.log(`${pokemon.entry.name} va vers ${target.name}`, path)
    pokemon.nextAction = { type: PokemonTypeAction.MOVE, path, target }

    // PATH >= 3 → pokemon tile + target tile + at least one free tile to move
    if(pokemon.nextAction.path && pokemon.nextAction.path.length >= 3){
        const [nextX,nextY] = pokemon.nextAction.path[1]
        const [sceneX,sceneY] = getPositionFromCoords(nextX,nextY);

        pokemon.facingDirection = getDirection(nextX - pokemon.x, nextY - pokemon.y)
        sprite.play(`${pokemon.entry.ref}_${pokemon.facingDirection}`)
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
            callback: () => { pokemon.resetTarget(target) }
        })
    } else {
        // Pokémon is already at range to attack
        pokemon.resetTarget(target)
    }
}

export function attackTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard, board: Board, game: GameScene){
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    const attackSpeed = 5000000 / (pokemon.speed+25) / game.gameSpeed
    pokemon.nextAction = { type: PokemonTypeAction.ATTACK, target }; // prevent changing target
    faceTarget(pokemon, target, game);
    pokemon.nextAction.timer = game.time.addEvent({
        delay: attackSpeed,
        loop: true,
        callback: () => {
            if(pokemon.pv === 0) return // Pokémon died while preparing attack
            if(target.pv <= 0) return pokemon.resetAction() //target already dead by another attack
            if(!canPokemonAttack(pokemon, target)) return pokemon.resetAction() // target moved away or blocking alteration

            pokemon.facingDirection = getDirection(target.x - pokemon.x, target.y - pokemon.y)
            pokemon.pp = Math.min(pokemon.entry.maxPP, pokemon.pp + 1);
            //console.log(`${pokemon.entry.name} (${pokemon.x},${pokemon.y}) is targeting ${target.name} (${target.x},${target.y}) → ${pokemon.facingDirection}`)
            faceTarget(pokemon, target, game);
            let skill = pokemon.entry.baseSkill;
            if(pokemon.entry.ppSkill && pokemon.pp >= pokemon.entry.maxPP){
                skill = pokemon.entry.ppSkill
                recordLastSkillSeen(skill)
                pokemon.pp = 0
            }

            triggerSkill(skill, pokemon, target, game)
        }
    })
}

export function testPrecision(attacker: PokemonOnBoard, skill: Skill){
    if(attacker.precision === 1) return true
    else return Math.random() <= attacker.precision * (skill.precision ?? 1)
}

export function applyDamage(damage: number, target: PokemonOnBoard, noPPGain=false, noWakeup = false){
    if(target.hasAlteration(AlterationType.INVULNERABLE)) return;
    target.pv = Math.max(0, target.pv - damage)
    if(!noPPGain) target.pp = Math.min(target.entry.maxPP, target.pp + clamp(damage/target.maxPV * 25, 2, 5))
    if(target.pv === 0) killPokemon(target)
    else {
        const sommeil = target.alterations.find(alt => alt.type === AlterationType.SOMMEIL)
        if(sommeil && !noWakeup){
            sommeil.stacks -= Math.ceil((damage/target.maxPV)*100);
            //console.log("reducing stacks to "+sommeil.stacks, Math.ceil(damage*10))
        }
    }
}

export function calcDamage(skill: Skill, target: PokemonOnBoard, attacker: PokemonOnBoard){
    let targetTypes = target.entry.types
    if(target.hasAlteration(AlterationType.ADAPTATION)) targetTypes = [skill.type]
    const typeFactor = targetTypes
        .map(type => TABLE_TYPES.get(skill.type)?.get(type) ?? 1)
        .reduce((a,b) => a*b)

    return attacker.attack * (1+skill.power/100) * typeFactor / target.defense
}

export function calcSelfDamage(skill: Skill, attacker: PokemonOnBoard){
    return attacker.attack * (1+(skill.selfDamage??0)/100) / attacker.defense
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


    pokemon.alterations.filter(alt => alt.effectSprite != null).forEach(alt => alt.effectSprite?.destroy())
    removePokemonSprite(pokemon, game)
}

export function healPokemon(pokemon: PokemonOnBoard, healAmount: number){
    pokemon.pv = Math.min(pokemon.maxPV, pokemon.pv + healAmount)
}