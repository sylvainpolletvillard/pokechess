import { Z } from "../data/depths";
import { OWNER_PLAYER } from "../data/owners";
import { PokemonOnBoard } from "../objects/pokemon";
import GameScene from "../scenes/GameScene";
import { wait } from "../utils/helpers";
import { addAlteration } from "./alteration";
import { getPokemonOnTile } from "./board";
import { faceTarget, calcDamage, applyDamage } from "./fight";
import { launchProjectile } from "./projectile";
import { SkillBehavior, HitSkill, ProjectileSkill, SpecialSkill, AOESkill } from "./skill";
import { triggerSpecial } from "./specials";

export function renderAttack(pokemon: PokemonOnBoard, target: PokemonOnBoard, game: GameScene) {
    faceTarget(pokemon, target, game);
    let skill = pokemon.baseSkill;
    if(pokemon.ppSkill && pokemon.pp >= pokemon.maxPP){
        skill = pokemon.ppSkill
        pokemon.pp = 0
    }
    
    if(skill.behavior === SkillBehavior.DIRECT_HIT){
        return renderDirectHitAttack(skill as HitSkill, pokemon, target, game)
    } else if(skill.behavior === SkillBehavior.PROJECTILE) {
        return launchProjectile(skill as ProjectileSkill, pokemon, target, game)
    } else if(skill.behavior === SkillBehavior.SPECIAL){
        return renderSpecialAttack(skill as SpecialSkill, pokemon, target, game)
    } else if(skill.behavior === SkillBehavior.AREA_OF_EFFECT){
        return renderAOEAttack(skill as AOESkill, pokemon, target, game)
    }
    console.error(`Not yet implemented: ${skill.name}`)
}

export function renderDirectHitAttack(skill: HitSkill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    let [x, y] = target.position, dx=0, dy=0, angle=0, delta = skill.effectDelta ?? 8;
    if(skill.effectOrigin === "source"){
        [x,y] = attacker.position
        angle = Math.atan2(target.y - attacker.y, target.x - attacker.x)
        dx = Math.round(Math.cos(angle) * delta)
        dy = Math.round(Math.sin(angle) * delta)
    } else if(skill.effectOrigin === "target"){
        angle = Math.atan2(attacker.y - target.y, attacker.x - target.x)
        dx = Math.round(Math.cos(angle) * delta)
        dy = Math.round(Math.sin(angle) * delta)
    } else if(skill.effectOrigin === "target_ground"){
        dy= -16 * (skill.effect.scale ?? 1) + delta
    }
    
    wait(skill.effectDelay ?? 0).then(() => {
        const sprite = game.add.sprite(x + dx, y + dy, "effects")

        if(skill.rotateSprite){
            sprite.rotation = angle + Math.PI/2;
        }    
        sprite.scale = skill.effect.scale ?? 1;
        sprite.blendMode = Phaser.BlendModes.OVERLAY
        sprite.setDepth(skill.effectDepth ?? Z.SKILL_EFFECT_ABOVE_POKEMON)
    
        sprite.play(skill.effect.key)
        sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            sprite.destroy()
        })
    })

    if(skill.triggerAlteration) addAlteration(target, skill.triggerAlteration, game)
    if(skill.chargeDelta) sendPokemonCharge(attacker, skill.chargeDelta, angle+Math.PI, game)
        
    wait(skill.hitDelay ?? 0).then(() => {
        const damage = calcDamage(skill, target, attacker)
        console.log(`${attacker.name} is attacking ${target.name} for ${damage} damage !`)
        applyDamage(damage, target)
        if(skill.hitAlteration) addAlteration(target, skill.hitAlteration, game)
    })
}

export function renderSpecialAttack(skill: SpecialSkill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
     triggerSpecial(skill.triggerSpecial, attacker, target, game)
}

export function renderAOEAttack(skill: AOESkill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    let [x, y] = target.position, dx=0, dy=0, angle=0, delta = skill.effectDelta ?? 8;
    if(skill.effectOrigin === "source"){
        [x,y] = attacker.position
        angle = Math.atan2(target.y - attacker.y, target.x - attacker.x)
        dx = Math.round(Math.cos(angle) * delta)
        dy = Math.round(Math.sin(angle) * delta)
    } else if(skill.effectOrigin === "target"){
        angle = Math.atan2(attacker.y - target.y, attacker.x - target.x)
        dx = Math.round(Math.cos(angle) * delta)
        dy = Math.round(Math.sin(angle) * delta)
    } else if(skill.effectOrigin === "source_ground"){
        [x,y] = attacker.position
        dy= -16 * (skill.effect.scale ?? 1) + delta
    }
    
    const sprite = game.add.sprite(x + dx, y + dy, "effects")
    sprite.scale = skill.effect.scale ?? 1;
    sprite.blendMode = Phaser.BlendModes.OVERLAY
    sprite.setDepth(skill.effectDepth ?? Z.SKILL_EFFECT_ABOVE_POKEMON)

    sprite.play(skill.effect.key)
    sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        sprite.destroy()
    })

    const tiles = skill.getTilesImpacted(attacker, target)
    
    wait(skill.hitDelay).then(() => {
        tiles.forEach(([i,j]) => {
            const target = getPokemonOnTile(i,j)
            if(target && target.owner !== OWNER_PLAYER){
                const damage = calcDamage(skill, target, attacker)
                console.log(`AOE from ${attacker.name} ; ${target.name} receives ${damage} damage !`)
                applyDamage(damage, target)
                if(skill.hitAlteration) addAlteration(target, skill.hitAlteration, game)
            }
        })       
    })
}

export function sendPokemonFlying(pokemon: PokemonOnBoard, game: GameScene){
    const targetSprite = game.sprites.get(pokemon.uid)
    if(!targetSprite) return;
    let {x, y} = targetSprite            
    game.tweens.add({
        targets: targetSprite, 
        x: x,
        y: y - 20,
        duration: 1600,
        ease: Phaser.Math.Easing.Bounce.Out,
        onComplete(){
            game.tweens.add({
                targets: targetSprite, 
                x: x,
                y: y,
                duration: 800,
                ease: Phaser.Math.Easing.Bounce.In
            })
        }
    });
}

export function sendPokemonCharge(pokemon: PokemonOnBoard, chargeDelta: number, chargeAngle: number, game: GameScene){
    const sprite = game.sprites.get(pokemon.uid)
    if(!sprite) return;
    let {x, y} = sprite            
    game.tweens.add({
        targets: sprite, 
        x: x + chargeDelta * Math.cos(chargeAngle),
        y: y + chargeDelta * Math.sin(chargeAngle),
        duration: 150,
        ease: Phaser.Math.Easing.Cubic.In,        
        onComplete(){
            game.tweens.add({
                targets: sprite, 
                x: x,
                y: y,
                duration: 250,
                ease: Phaser.Math.Easing.Linear
            })
        }
    });
}