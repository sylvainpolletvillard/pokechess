import {Z} from "../data/depths";
import {PokemonOnBoard} from "../objects/pokemon";
import GameScene from "../scenes/GameScene";
import {wait} from "../utils/helpers";
import {addAlteration} from "./alteration";
import {getPokemonOnTile, getPositionFromCoords, isOnBoard} from "./board";
import {applyDamage, calcDamage, calcSelfDamage, testPrecision} from "./fight";
import {launchProjectile} from "./projectile";
import {AOESkill, HitSkill, ProjectileSkill, Skill, SkillBehavior, SpecialSkill} from "./skill";
import {triggerSpecial} from "./specials";
import {Effect} from "../data/effects";
import { getDeltaFromDirection, getDirectionFromAngle, getDirectionFromVector } from "../utils/directions";
import { getAllianceState } from "./player";
import { TYPE_EAU } from "../data/types";
import { PokemonTypeAction } from "../data/pokemons";

export function triggerSkill(skill: Skill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    if(skill.behavior === SkillBehavior.DIRECT_HIT){
        return renderDirectHitAttack(skill as HitSkill, attacker, target, game)
    } else if(skill.behavior === SkillBehavior.PROJECTILE) {
        return launchProjectile(skill as ProjectileSkill, attacker, target, game)
    } else if(skill.behavior === SkillBehavior.SPECIAL){
        return renderSpecialAttack(skill as SpecialSkill, attacker, target, game)
    } else if(skill.behavior === SkillBehavior.AREA_OF_EFFECT){
        return renderAOEAttack(skill as AOESkill, attacker, target, game)
    }
    console.error(`Not yet implemented: ${skill.name}`)
}

export function makeEffectSprite(effect: Effect, x: number, y: number, game: GameScene, doNotKillSpriteOnEndAnim?: boolean){
    const effectSprite = game.add.sprite(x, y, "effects")
    effectSprite.scale = effect?.scale ?? 1;
    effectSprite.blendMode = Phaser.BlendModes.OVERLAY
    effectSprite.tint = effect?.tint ?? 0xffffff;
    effectSprite.setDepth(effect.depth ?? Z.SKILL_EFFECT_ABOVE_POKEMON)
    effectSprite.alpha = effect?.opacity ?? 1
    effectSprite.play(effect.key)
    doNotKillSpriteOnEndAnim || effectSprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        effectSprite.destroy()
    })

    return effectSprite
}

export function renderSkillEffect(skill: Skill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    const effect = skill.effect
    if(!effect) return;

    let [x, y] = target.position, dx=0, dy=0;
    let angle = Math.atan2(target.y - attacker.y, target.x - attacker.x)

    if(effect.position === "source" || effect.position === "parabolic_to_target"){
        [x,y] = attacker.position
        dx = Math.round(Math.cos(angle) * (effect.delta ?? 8))
        dy = Math.round(Math.sin(angle) * (effect.delta ?? 8))        
    } else if(effect.position === "target" || effect.position === "target_to_source"){
        dx = Math.round(Math.cos(angle+Math.PI) * (effect.delta ?? 8))
        dy = Math.round(Math.sin(angle+Math.PI) * (effect.delta ?? 8))
    } else if(effect.position === "target_ground"){
        dy= effect.delta ?? 0
    } else if(effect.position === "source_ground"){
        [x,y] = attacker.position
        dy= effect.delta ?? 0
    }

    const effectSprite = makeEffectSprite(effect, x + dx, y + dy, game)

    if(skill.rotateSprite){
        effectSprite.rotation = angle;
    }

    if(effect.position === "target_to_source"){
        const [sourceX, sourceY] = attacker.position
        game.tweens.add({
            targets: effectSprite,
            x: sourceX,
            y: sourceY,
            duration: (skill as HitSkill).hitDelay ?? 250,
            ease: 'Linear',
            onComplete(){
                if(!skill.hitEffect) effectSprite.destroy()
            }
        });
    }

    if(effect.position === "parabolic_to_target"){
        const [sourceX, sourceY] = attacker.position
        const [targetX, targetY] = target.position
        const startPoint = new Phaser.Math.Vector2(sourceX, sourceY);
        const controlPoint1 = new Phaser.Math.Vector2(sourceX + (targetX-sourceX)*0.2, sourceY-20);
        const controlPoint2 = new Phaser.Math.Vector2(sourceX + (targetX-sourceX)*0.8, targetY-20);
        const endPoint = new Phaser.Math.Vector2(targetX, targetY);
        const curve = new Phaser.Curves.CubicBezier(startPoint, controlPoint1, controlPoint2, endPoint);
        const tweenObj = { t: 0 };
        const duration = skill.hitDelay ?? 250

        game.tweens.add({
            targets: tweenObj,
            t: 1,
            duration,
            //ease: (t: number) => 0.5-(1-2*(t*1000/duration))**3,
            ease: "Linear",
            onComplete(){
                if(!skill.hitEffect) effectSprite.destroy()
            },
            onUpdate: function(tween, tweenObj){
                const position = curve.getPoint(tweenObj.t);
                effectSprite.x = position.x;
                effectSprite.y = position.y;
            }
        });
    }

    wait(skill.hitDelay ?? 0).then(() => {
        if(skill.hitEffect){
            const hitEffect = skill.hitEffect as Effect
            effectSprite.scale = hitEffect.scale ?? 1
            effectSprite.play(hitEffect.key)
            effectSprite.setDepth(hitEffect.depth ?? Z.SKILL_EFFECT_ABOVE_POKEMON)
            effectSprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                effectSprite.destroy()
            })
        }
        if(skill.knockback){
            let knockbackAngle = Math.atan2(attacker.y - target.y, target.x - attacker.x)
            knockback(target, knockbackAngle, game)
        }
    })
}

export function renderDirectHitAttack(skill: Skill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    renderSkillEffect(skill, attacker, target, game)

    if(skill.triggerAlteration) addAlteration(target, skill.triggerAlteration, game)
    if((skill as HitSkill).chargeDelta) sendPokemonCharge(attacker, target, (skill as HitSkill).chargeDelta!, game)

    wait(skill.hitDelay ?? 0).then(() => {
        const damage = calcDamage(skill, target, attacker)
        console.log(`${attacker.entry.name} is attacking ${target.entry.name} for ${damage} damage !`)
        if(testPrecision(attacker, target, skill)){
            attacker.buffs.onHit.forEach(buff => buff({ target, attacker }))
            target.buffs.onHitReceived.forEach(buff => buff({ damage, attacker }))
            applyDamage(damage, target, attacker)
            if(skill.selfDamage) applyDamage(calcSelfDamage(skill, attacker), attacker, attacker)            
        }
        if(skill.hitAlteration) addAlteration(target, skill.hitAlteration, game)
        if(skill.selfAlteration) addAlteration(attacker, skill.selfAlteration, game)
    })
}

export function renderSpecialAttack(skill: SpecialSkill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    renderSkillEffect(skill, attacker, target, game)
    if(skill.triggerSpecial) wait(skill.triggerSpecialDelay ?? 0).then(() => triggerSpecial(skill.triggerSpecial!, attacker, target, game))
    if(skill.triggerAlteration) addAlteration(target, skill.triggerAlteration, game)
    if(skill.selfAlteration) addAlteration(attacker, skill.selfAlteration, game)    
}

export function renderAOEAttack(skill: AOESkill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    renderSkillEffect(skill, attacker, target, game)
    if(skill.selfAlteration) addAlteration(attacker, skill.selfAlteration, game)

     // important: retrieve the impacted tiles at the BEGINNING of the anim
    const tiles = skill.getTilesImpacted(attacker, target).filter(([i,j]) => isOnBoard(i,j))
    
    wait(skill.hitDelay ?? 0).then(() => {
        tiles.forEach(([i,j]) => {
            const target = getPokemonOnTile(i,j)
            if(target && target.owner !== attacker.owner){
                const damage = calcDamage(skill, target, attacker)
                console.log(`AOE from ${attacker.entry.name} ; ${target.entry.name} receives ${damage} damage !`)
                applyDamage(damage, target, attacker)
                if(skill.hitAlteration) addAlteration(target, skill.hitAlteration, game)
            }
        })

        if(skill.selfDamage) applyDamage(calcSelfDamage(skill, attacker), attacker, attacker)
    })
}

export function sendPokemonFlying(pokemon: PokemonOnBoard, stacks: number, game: GameScene){
    const targetSprite = game.sprites.get(pokemon.uid)
    if(!targetSprite) return;

    const [sourceX, sourceY] = pokemon.position
    const startPoint = new Phaser.Math.Vector2(sourceX, sourceY);
    const controlPoint = new Phaser.Math.Vector2(sourceX, sourceY-20);
    const curve = new Phaser.Curves.CubicBezier(startPoint, controlPoint, controlPoint, startPoint);
    const tweenObj = { t: 0 };
    const duration = 250 + stacks * game.gameSpeed

    targetSprite.anims.resume()
    wait(duration).then(() => { if(pokemon.alive) targetSprite.anims.pause() })

    game.tweens.add({
        targets: tweenObj,
        t: 1,
        duration,
        //ease: (t: number) => 0.5-(1-2*(t*1000/duration))**3,
        ease: Phaser.Math.Easing.Circular.InOut,
        onUpdate: function(tween, tweenObj){
            const position = curve.getPoint(tweenObj.t);
            targetSprite.x = position.x;
            targetSprite.y = position.y;
        }
    });    
}

export function sendPokemonCharge(attacker: PokemonOnBoard, target: PokemonOnBoard, chargeDelta: number, game: GameScene){
    const chargeAngle = Math.atan2(target.y - attacker.y, target.x - attacker.x)
    const sprite = game.sprites.get(attacker.uid)
    if(!sprite) return;
    let {x, y} = sprite
    const attackSpeed = 5000000 / (attacker.speed+25) / game.gameSpeed
    sprite.anims.resume()
    game.tweens.add({
        targets: sprite, 
        x: x + chargeDelta * Math.cos(chargeAngle),
        y: y + chargeDelta * Math.sin(chargeAngle),
        duration: Math.min(150, attackSpeed),
        ease: Phaser.Math.Easing.Cubic.In,        
        onComplete(){
            game.tweens.add({
                targets: sprite, 
                x: x,
                y: y,
                duration: 250,
                ease: Phaser.Math.Easing.Linear
            })
            if(attacker.alive) sprite.anims.pause()
        }
    });
}

export function knockback(pokemon: PokemonOnBoard, angle: number, game: GameScene){    
    const sprite = game.sprites.get(pokemon.uid)
    let knockbackStrength = pokemon.alliances.get(TYPE_EAU)?.stepReachedN ?? 0

    if(!sprite || knockbackStrength === 0 || pokemon.untargettable) return;

    const direction = getDirectionFromAngle(angle)
    const [dx,dy] = getDeltaFromDirection(direction)
    let { x, y } = pokemon
    let numberTilesTravelled = 0
    
    while(isOnBoard(x+dx, y+dy) && getPokemonOnTile(x+dx, y+dy) == null && knockbackStrength > 0){
        x += dx;
        y += dy;
        knockbackStrength--;
        numberTilesTravelled++;
    }
    console.log(`Knockback on ${pokemon.entry.name}: ${numberTilesTravelled}`)
    if(numberTilesTravelled === 0) return;

    const knockbackDuration = numberTilesTravelled * 500
    pokemon.makeUntargettable(knockbackDuration);
    freezePokemonDuringMs(pokemon, knockbackDuration, game);
    pokemon.x = x;
    pokemon.y = y;

    let [spriteX,spriteY] = getPositionFromCoords(x,y)
    game.tweens.add({
        targets: sprite, 
        x: spriteX,
        y: spriteY,
        duration: knockbackDuration,
        ease: Phaser.Math.Easing.Expo.Out,        
        onComplete(){
            if(pokemon.alive){                
                pokemon.resetAction()
            }            
        }
    });
}

export function freezePokemonDuringMs(pokemon: PokemonOnBoard, durationInMs: number, game: GameScene){    
    pokemon.resetAction({ 
        type: PokemonTypeAction.IDLE,
        timer: game.time.addEvent({
            delay: durationInMs,
            callback: () => pokemon.resetAction()
        })
    })
}