import {getPokemonCry, Pokemon, PokemonTypeAction} from "../data/pokemons";
import {distanceBetweenPokemon, findClosestReachableTarget, findPathToTarget} from "./pathfinding";
import {getPokemonOnTile, getPositionFromCoords} from "./board";
import GameScene from "../scenes/GameScene";
import {getDirection} from "./anims";
import Phaser from "phaser";
import {makePokemonSprite, PokemonOnBoard, removePokemonSprite} from "../objects/pokemon";
import {GameStage, gameState} from "./gamestate";
import {Skill} from "./skill";
import {hasBlockingAlteration, removeAlteration} from "./alteration";
import {renderSkillEffect, triggerSkill} from "./skill-anims";
import {Alteration, AlterationType} from "../data/alterations";
import {clamp} from "../utils/helpers";
import {recordLastSkillSeen} from "./specials";
import {TABLE_TYPES, TYPE_INSECTE, TYPE_NORMAL, TYPE_POISON, TYPE_ROCHE, TYPE_VOL} from "../data/types";
import { OWNER_PLAYER } from "../data/owners";
import { xpToLevel } from "./xp";
import { startDialog } from "./dialog";
import { pauseMusicAndPlaySound, playSound } from "./audio";
import { SKILLS } from "../data/skills";
import { DialogLine } from "../types/dialog";
import { registerDamageDone, registerDamageReceived, registerHeal } from "./stats";

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
    if(!pokemon.hasType(TYPE_VOL)) sprite.anims.pause()
}

export function moveToTarget(pokemon: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    const sprite = game.sprites.get(pokemon.uid)
    if(sprite == null) return console.error(`Sprite not found for pokemon ${pokemon.uid}`)

    if(target.nextAction.type === PokemonTypeAction.MOVE 
    && target.nextAction.target === pokemon
    && distanceBetweenPokemon(pokemon, target) < 2){
        // if target is already moving to you, do nothing to prevent dog-fight
        pokemon.resetAction({ type: PokemonTypeAction.IDLE, target })
        return;
    }

    const path = findPathToTarget(pokemon, target, gameState.board)
    //console.log(`${pokemon.entry.name} va vers ${target.name}`, path)
    pokemon.resetAction({ type: PokemonTypeAction.MOVE, path, target })

    // PATH >= 3 → pokemon tile + target tile + at least one free tile to move
    if(pokemon.nextAction.path && pokemon.nextAction.path.length >= 3){
        const [nextX,nextY] = pokemon.nextAction.path[1]
        const [sceneX,sceneY] = getPositionFromCoords(nextX,nextY);

        pokemon.facingDirection = getDirection(nextX - pokemon.x, nextY - pokemon.y)
        sprite.play(`${pokemon.entry.ref}_${pokemon.facingDirection}`)
        sprite.anims.resume()
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
            callback: () => {
                if(pokemon.alive){
                    if(!pokemon.hasType(TYPE_VOL)) sprite.anims.pause()
                    pokemon.resetTarget(target)
                }
            }
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
    pokemon.resetAction({ type: PokemonTypeAction.ATTACK, target }); // prevent changing target
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
            } while((i<0 || i>=7) && Math.abs(dx) <= 8)
            
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
        pokemon.resetAction({ type: PokemonTypeAction.JUMP, path: [[i,j]] });
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
    pokemon.x = nextX;
    pokemon.y = nextY;
    const duration = 1000
    pokemon.makeUntargettable(duration)    
    game.tweens.add({
        targets: sprite,
        x: { value: sceneX, duration, ease: Phaser.Math.Easing.Circular.InOut },
        y: { value: sceneY, duration, ease: Phaser.Math.Easing.Circular.InOut },
        scale: { value: 1.25, duration: duration/2, ease: Phaser.Math.Easing.Circular.InOut, yoyo: true }
    });    
    pokemon.resetAction({ 
        type: PokemonTypeAction.IDLE,
        timer: game.time.addEvent({
            delay: duration,
            callback: () => pokemon.resetAction()
        })
    })
}

export function testPrecision(attacker: PokemonOnBoard, target: PokemonOnBoard, skill: Skill){    
    const precisionScore = (attacker.precision - (target.dodge ?? 0)) * (skill.precision ?? 1)
    if(precisionScore >= 1) return true
    else return Math.random() <= precisionScore
}

export function applyDamage(damage: number, target: PokemonOnBoard, attacker?: PokemonOnBoard, noPPGain=false, noWakeup = false){
    if(target.hasAlteration(AlterationType.INVULNERABLE)) return;
    target.pv = Math.max(0, target.pv - damage)
    if(attacker && attacker !== target) registerDamageDone(attacker, damage)
    registerDamageReceived(target, damage)
    if(!noPPGain) target.pp = Math.min(target.entry.maxPP, target.pp + clamp(damage/target.maxPV * 25, 2, 5))
    if(target.pv === 0) killPokemon(target)
    else {
        const sommeil = target.alterations.find(alt => alt.type === AlterationType.SOMMEIL)
        if(sommeil && !noWakeup){
            const stacksConsummed = Math.ceil((damage/target.maxPV)*200);
            sommeil.stacks -= stacksConsummed;
            console.log(`reducing sommeil stacks by ${stacksConsummed}`)
            if(sommeil.stacks <= 0){
                removeAlteration(target, sommeil)                
            }
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
        const normalAllianceBonus = target.alliances.get(TYPE_NORMAL)
        if(normalAllianceBonus){
            typeFactor = Math.max(1, typeFactor - 0.3 * normalAllianceBonus.stepReachedN)
        }
    }

    return attacker.attack * (1+skill.power/60) * typeFactor / target.defense
}

export function calcSelfDamage(skill: Skill, attacker: PokemonOnBoard): number {
    return attacker.attack * (1+(skill.selfDamage??0)/100) / attacker.defense
}

export function calcPoisonDamage(target: PokemonOnBoard, alteration: Alteration, game: GameScene): number {
    const perSecond = game.gameSpeed / 1000    

    let poisonDamage = clamp(alteration.stacks, 1, 300) * perSecond * (0.025 / 100) * target.maxPV // 0.025% max HP per stack per seconde
        
    const teamRocheBonus = target.alliances.get(TYPE_ROCHE)    
    const opponentPoisonBonus = target.owner === OWNER_PLAYER ? gameState.board.otherTeamAlliances.get(TYPE_POISON) : gameState.board.playerAlliances.get(TYPE_POISON)

    let buffFactor = 1
    if(target.hasType(TYPE_POISON)){
        buffFactor -= 0.5 // type poison = 50% résistance au poison             
    }
    if(opponentPoisonBonus){
        buffFactor += 0.4 * opponentPoisonBonus.stepReachedN
    }
    if(teamRocheBonus){
        buffFactor -= 0.2 * teamRocheBonus.stepReachedN
    }

    poisonDamage *= buffFactor
    return poisonDamage
}

export function calcBurnDamage(target: PokemonOnBoard, game: GameScene): number {
    const perSecond = game.gameSpeed / 1000  

    let burnDamage = 0.1 * perSecond * target.level; // 0.1 HP per second per level
    let buffFactor = 1
    
    const teamRocheBonus = target.alliances.get(TYPE_ROCHE)
    if(teamRocheBonus){
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
        
    playSound(getPokemonCry(pokemon.entry))
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
    registerHeal(pokemon, healAmount)
}

export function gainXP(pokemon: Pokemon, amount: number){
    const game = gameState.activeScene as GameScene
    const oldLvl = pokemon.level
    let buffFactor = 1
    const bonusInsecte = pokemon.owner === OWNER_PLAYER ? gameState.board.playerAlliances.get(TYPE_INSECTE) : gameState.board.otherTeamAlliances.get(TYPE_INSECTE)
    if(pokemon.hasType(TYPE_INSECTE) && bonusInsecte){
        buffFactor += 0.2 * bonusInsecte.stepReachedN
    }

    pokemon.xp += amount * buffFactor;
    pokemon.level = xpToLevel(pokemon.xp);

    if(oldLvl !== pokemon.level){
        pauseMusicAndPlaySound("level_up")
        const lines: DialogLine[] = [`${pokemon.entry.name} passe au niveau ${pokemon.level}`]
        if(pokemon.entry.evolution && pokemon.level >= (pokemon.entry.evolutionLevel ?? 50)){
            lines.push(() => {
                let oldEntry = pokemon.entry
                pokemon.entry = pokemon.entry.evolution!
                pauseMusicAndPlaySound("success")
                if(pokemon instanceof PokemonOnBoard && pokemon.alive){
                     // retrieve pokemon from board instead to get latest position
                    const pokemonOnBoard = gameState.board.playerTeam.find(pkm => pkm.uid === pokemon.uid) as PokemonOnBoard
                    renderSkillEffect(SKILLS.EVOLUTION, pokemonOnBoard, pokemonOnBoard, game)
                    removePokemonSprite(pokemonOnBoard, game)                    
                    const newSprite = makePokemonSprite(pokemonOnBoard, game)
                    newSprite.play(`${pokemon.entry.ref}_${pokemonOnBoard.facingDirection}`)
                    game.sprites.set(pokemon.uid, newSprite)
                }

                return `${oldEntry.name} évolue en ${pokemon.entry.name} !`
            })
        }
        return startDialog(lines)
    }
    return Promise.resolve(pokemon.level)
}