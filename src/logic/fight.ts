import {Pokemon, PokemonTypeAction} from "../data/pokemons";
import {findClosestReachableTarget, findPathToTarget} from "./pathfinding";
import {getPokemonOnTile, getPositionFromCoords} from "./board";
import GameScene from "../scenes/GameScene";
import {getDirection} from "./anims";
import Phaser from "phaser";
import {PokemonOnBoard, removePokemonSprite} from "../objects/pokemon";
import {GameStage, gameState} from "./gamestate";
import {Skill} from "./skill";
import {hasBlockingAlteration} from "./alteration";
import {triggerSkill} from "./skill-anims";
import {Alteration, AlterationType} from "../data/alterations";
import {clamp} from "../utils/helpers";
import {recordLastSkillSeen} from "./specials";
import {TABLE_TYPES, TYPE_INSECTE, TYPE_NORMAL, TYPE_POISON, TYPE_ROCHE, TYPE_VOL} from "../data/types";
import {getAllianceState} from "./player";
import { OWNER_PLAYER } from "../data/owners";
import { xpToLevel } from "./xp";

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

export function updatePokemonAction(pokemon: PokemonOnBoard, game: GameScene){
    if(pokemon.nextAction.timer) return; // waiting for end of previous move
    
    if(pokemon.nextAction.type === PokemonTypeAction.JUMP) return jump(pokemon, game)

    // update Pokémon action only when Pokémon is idle
    if(pokemon.nextAction.type !== PokemonTypeAction.IDLE || !pokemon.alive) return;

    if(hasBlockingAlteration(pokemon)) return;    
    
    const target = pokemon.nextAction.target || findClosestReachableTarget(pokemon)
    if(target == null || !target.alive){
        pokemon.resetAction()
    } else {
        if(canPokemonAttack(pokemon, target)){
            attackTarget(pokemon, target, game)
        } else if(canPokemonMove(pokemon)) {
            moveToTarget(pokemon, target, game)
        }
    }
}

export function faceTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    pokemon.facingDirection = getDirection(target.x - pokemon.x, target.y - pokemon.y)
    sprite.play(`${pokemon.entry.ref}_${pokemon.facingDirection}`)
}

export function moveToTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
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

export function attackTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    const attackSpeed = 100 + (10000000 / (pokemon.speed+50)) / game.gameSpeed    
    pokemon.nextAction = { type: PokemonTypeAction.ATTACK, target }; // prevent changing target
    faceTarget(pokemon, target, game);
    pokemon.nextAction.timer = game.time.addEvent({
        delay: attackSpeed,
        loop: true,
        callback: () => {
            if(pokemon.pv === 0) return // Pokémon died while preparing attack
            if(!target.alive) return pokemon.resetAction() //target already dead by another attack
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

export function initJumps(){
    const reservedTiles = new Set()
    for (let pokemon of gameState.allPokemonsOnBoard) {
        if(!pokemon.hasType(TYPE_VOL)) continue;
         // find coordinates where to jump
        let i = pokemon.placementX, j = pokemon.owner === OWNER_PLAYER ? 0 : 7; // ideal tile to jump
        let dx = 1
        let dy = 0
        while(getPokemonOnTile(i,j) != null || reservedTiles.has([i,j].join(","))){
            do {
                i += dx;
                dx = -1 * (Math.abs(dx)+1) * Math.sign(dx) // +1 , -2, +3, -4 ...
            } while((i<0 || i>=8) && Math.abs(dx) <= 8)
            
            if(Math.abs(dx) > 8){ // row is full, try another row              
                j = pokemon.owner === OWNER_PLAYER ? dy : 7 - dy
                i = pokemon.placementX
                dx = 1
                dy++;
            }
            if(dy > 4){
                // everything is full, cancel jump
                return;
            }        
        }

        console.log(`Init jump of ${pokemon.entry.name} on ${[i,j]}`)
        pokemon.nextAction = { type: PokemonTypeAction.JUMP, path: [[i,j]] };
        reservedTiles.add([i,j].join(","))
    }
}

export function jump(pokemon: PokemonOnBoard, game: GameScene){
    if(!pokemon.nextAction || !pokemon.nextAction.path) return;
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    const [nextX,nextY] = pokemon.nextAction.path[0]
    const [sceneX,sceneY] = getPositionFromCoords(nextX,nextY);
    pokemon.facingDirection = getDirection(nextX - pokemon.x, nextY - pokemon.y)
    sprite.play(`${pokemon.entry.ref}_${pokemon.facingDirection}`)
    pokemon.untargettable = true;
    pokemon.x = nextX;
    pokemon.y = nextY;
    const duration = 1000        
    game.tweens.add({
        targets: sprite,
        x: { value: sceneX, duration, ease: Phaser.Math.Easing.Circular.InOut },
        y: { value: sceneY, duration, ease: Phaser.Math.Easing.Circular.InOut },
        scale: { value: 1.25, duration: duration/2, ease: Phaser.Math.Easing.Circular.InOut, yoyo: true }
    });
    pokemon.nextAction = { 
        type: PokemonTypeAction.IDLE,
        timer: game.time.addEvent({
            delay: duration,
            callback: () => {             
                pokemon.untargettable = false
                pokemon.resetAction()
            }
        })
    }
}

export function testPrecision(attacker: PokemonOnBoard, target: PokemonOnBoard, skill: Skill){    
    const precisionScore = (attacker.precision - (target.dodge ?? 0)) * (skill.precision ?? 1)
    if(precisionScore >= 1) return true
    else return Math.random() <= precisionScore
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

export function calcDamage(skill: Skill, target: PokemonOnBoard, attacker: PokemonOnBoard): number {
    let targetTypes = target.entry.types
    if(target.hasAlteration(AlterationType.ADAPTATION)) targetTypes = [skill.type]
    let typeFactor = targetTypes
        .map(type => TABLE_TYPES.get(skill.type)?.get(type) ?? 1)
        .reduce((a,b) => a*b)
    
    if(typeFactor > 1){        
        const normalAllianceBonus = getAllianceState(target.team, TYPE_NORMAL)
        if(normalAllianceBonus.stepReached){
            typeFactor = Math.max(1, typeFactor - 0.3 * normalAllianceBonus.stepReachedN)
        }
    }

    return attacker.attack * (1+skill.power/80) * typeFactor / target.defense
}

export function calcSelfDamage(skill: Skill, attacker: PokemonOnBoard): number {
    return attacker.attack * (1+(skill.selfDamage??0)/100) / attacker.defense
}

export function calcPoisonDamage(target: PokemonOnBoard, alteration: Alteration, game: GameScene): number {
    const perSecond = game.gameSpeed / 1000    

    let poisonDamage = Math.min(500, alteration.stacks) * perSecond * (1 / 10000) * target.maxPV // 0.01% max HP per stack per seconde
        
    const teamRocheBonus = getAllianceState(target.team, TYPE_ROCHE)    
    const opponentPoisonBonus = getAllianceState(target.opponents, TYPE_POISON)

    let buffFactor = 1
    if(target.hasType(TYPE_POISON)){
        buffFactor -= 0.5 // type poison = 50% résistance au poison             
    }
    if(opponentPoisonBonus.stepReachedN > 0){
        buffFactor += 0.4 * opponentPoisonBonus.stepReachedN
    }
    if(teamRocheBonus.stepReachedN > 0){
        buffFactor -= 0.2 * teamRocheBonus.stepReachedN
    }

    poisonDamage *= buffFactor
    return poisonDamage
}

export function calcBurnDamage(target: PokemonOnBoard, game: GameScene): number {
    const perSecond = game.gameSpeed / 1000  

    let burnDamage = 0.1 * perSecond * target.level; // 0.1 HP per second per level
    let buffFactor = 1
    
    const teamRocheBonus = getAllianceState(target.team, TYPE_ROCHE)
    if(teamRocheBonus.stepReachedN > 0){
        buffFactor -= 0.2 * teamRocheBonus.stepReachedN
    }

    burnDamage *= buffFactor
    return burnDamage
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
    if(pokemon.hasAlteration(AlterationType.BRULURE)) healAmount *= 0.5 // les brûlures réduisent de 50% l'efficacité des soins
    pokemon.pv = Math.min(pokemon.maxPV, pokemon.pv + healAmount)
}

export function gainXP(pokemon: Pokemon, amount: number){    
    let buffFactor = 1
    const team = pokemon.owner === OWNER_PLAYER ? gameState.board.playerTeam : gameState.board.otherTeam
    const bonusInsecte = getAllianceState(team, TYPE_INSECTE)
    if(pokemon.hasType(TYPE_INSECTE) && bonusInsecte.stepReached){
        buffFactor += 0.2 * bonusInsecte.stepReachedN
    }

    pokemon.xp += amount * buffFactor;
    pokemon.level = xpToLevel(pokemon.xp);
    return pokemon.level
}