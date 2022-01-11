import { Z } from "../data/depths";
import { OWNER_PLAYER } from "../data/owners";
import { PokemonOnBoard } from "../objects/pokemon";
import GameScene from "../scenes/GameScene";
import { wait } from "../utils/helpers";
import { addAlteration } from "./alteration";
import { getPokemonOnTile } from "./board";
import { faceTarget, calcDamage, applyDamage } from "./fight";
import { launchProjectile } from "./projectile";
import { SkillBehavior, HitSkill, ProjectileSkill, BuffSkill, AOESkill } from "./skill";

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
    } else if(skill.behavior === SkillBehavior.BUFF){
        return renderBuffAttack(skill as BuffSkill, pokemon, game)
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
        dy= -16 * (skill.effect.scale ?? 0.5)
    }
    
    const sprite = game.add.sprite(x + dx, y + dy, "effects")

    if(skill.rotateSprite){
        sprite.rotation = angle + Math.PI/2;
    }    
    sprite.scale = skill.effect.scale ?? 0.5;
    sprite.blendMode = Phaser.BlendModes.OVERLAY
    sprite.setDepth(skill.effectDepth ?? Z.SKILL_EFFECT_ABOVE_POKEMON)

    sprite.play(skill.effect.key)
    sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        sprite.destroy()
    })

    if(skill.triggerAlteration) addAlteration(target, skill.triggerAlteration, game)
        
    wait(skill.hitDelay).then(() => {
        const damage = calcDamage(skill, target, attacker)
        console.log(`${attacker.name} is attacking ${target.name} for ${damage} damage !`)
        applyDamage(damage, target)
    })
}

export function renderBuffAttack(skill: BuffSkill, target: PokemonOnBoard, game: GameScene){
    let [x, y] = target.position
    
    const sprite = game.add.sprite(x, y, "effects")
    sprite.scale = skill.effect.scale ?? 0.5;
    sprite.blendMode = Phaser.BlendModes.OVERLAY
    sprite.setDepth(skill.effectDepth ?? Z.SKILL_EFFECT_ABOVE_POKEMON)

    sprite.play(skill.effect.key)
    sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        sprite.destroy()
    })

    if(skill.triggerAlteration) addAlteration(target, skill.triggerAlteration, game)
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
        dy= -16 * (skill.effect.scale ?? 0.5)
    }
    
    const sprite = game.add.sprite(x + dx, y + dy, "effects")
    sprite.scale = skill.effect.scale ?? 0.5;
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