import {Z} from "../data/depths";
import {OWNER_PLAYER} from "../data/owners";
import {PokemonOnBoard} from "../objects/pokemon";
import GameScene from "../scenes/GameScene";
import {wait} from "../utils/helpers";
import {addAlteration} from "./alteration";
import {getPokemonOnTile} from "./board";
import {applyDamage, calcDamage, faceTarget, testPrecision} from "./fight";
import {launchProjectile} from "./projectile";
import {AOESkill, HitSkill, ProjectileSkill, Skill, SkillBehavior, SpecialSkill} from "./skill";
import {triggerSpecial} from "./specials";
import {AlterationType} from "../data/alterations";

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

export function renderSkillEffect(skill: Skill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    if(!skill.effect) return { angle: 0, dx: 0, dy: 0 };

    let [x, y] = target.position, dx=0, dy=0, angle=0, delta = skill.effectDelta ?? 8;
    if(skill.effectPosition === "source" || skill.effectPosition === "parabolic_to_target"){
        [x,y] = attacker.position
        angle = Math.atan2(target.y - attacker.y, target.x - attacker.x)
        dx = Math.round(Math.cos(angle) * delta)
        dy = Math.round(Math.sin(angle) * delta)
    } else if(skill.effectPosition === "target" || skill.effectPosition === "target_to_source"){
        angle = Math.atan2(attacker.y - target.y, attacker.x - target.x)
        dx = Math.round(Math.cos(angle) * delta)
        dy = Math.round(Math.sin(angle) * delta)
    } else if(skill.effectPosition === "target_ground"){
        dy= -16 * (skill.effect?.scale ?? 1) + delta
    } else if(skill.effectPosition === "source_ground"){
        [x,y] = attacker.position
        dy= -16 * (skill.effect?.scale ?? 1) + delta
    }

    const effectSprite = game.add.sprite(x + dx, y + dy, "effects")

    if(skill.rotateSprite){
        effectSprite.rotation = angle + Math.PI/2;
    }
    effectSprite.scale = skill.effect?.scale ?? 1;
    effectSprite.blendMode = Phaser.BlendModes.OVERLAY
    effectSprite.tint = skill.effect?.tint ?? 0xffffff;
    effectSprite.setDepth(skill.effect.depth ?? Z.SKILL_EFFECT_ABOVE_POKEMON)

    effectSprite.play(skill.effect.key)
    effectSprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        effectSprite.destroy()
    })

    if(skill.effectPosition === "target_to_source"){
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

    if(skill.effectPosition === "parabolic_to_target"){
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

    if(skill.hitEffect){
        wait(skill.hitDelay ?? 0).then(() => {
            effectSprite.play(skill.hitEffect!.key)
            effectSprite.setDepth(skill.hitEffect!.depth ?? Z.SKILL_EFFECT_ABOVE_POKEMON)
            effectSprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                effectSprite.destroy()
            })
        })
    }

    return { angle, dx, dy }
}

export function renderDirectHitAttack(skill: HitSkill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    let { angle } = renderSkillEffect(skill, attacker, target, game)

    if(skill.triggerAlteration) addAlteration(target, skill.triggerAlteration, game)
    if(skill.chargeDelta) sendPokemonCharge(attacker, skill.chargeDelta, angle+Math.PI, game)
        
    wait(skill.hitDelay ?? 0).then(() => {
        const damage = calcDamage(skill, target, attacker)
        console.log(`${attacker.name} is attacking ${target.name} for ${damage} damage !`)
        testPrecision(attacker) && applyDamage(damage, target)
        if(skill.hitAlteration) addAlteration(target, skill.hitAlteration, game)
        if(skill.selfAlteration) addAlteration(attacker, skill.selfAlteration, game)
    })
}

export function renderSpecialAttack(skill: SpecialSkill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    renderSkillEffect(skill, attacker, target, game)
    if(skill.triggerSpecial) triggerSpecial(skill.triggerSpecial, attacker, target, game)
    if(skill.triggerAlteration) addAlteration(target, skill.triggerAlteration, game)
    if(skill.selfAlteration) addAlteration(attacker, skill.selfAlteration, game)    
}

export function renderAOEAttack(skill: AOESkill, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    renderSkillEffect(skill, attacker, target, game)
    if(skill.selfAlteration) addAlteration(attacker, skill.selfAlteration, game)

    const tiles = skill.getTilesImpacted(attacker, target)
    
    wait(skill.hitDelay ?? 0).then(() => {
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

export function sendPokemonFlying(pokemon: PokemonOnBoard, stacks: number, game: GameScene){
    const targetSprite = game.sprites.get(pokemon.uid)
    if(!targetSprite) return;

    const [sourceX, sourceY] = pokemon.position
    const startPoint = new Phaser.Math.Vector2(sourceX, sourceY);
    const controlPoint = new Phaser.Math.Vector2(sourceX, sourceY-20);
    const curve = new Phaser.Curves.CubicBezier(startPoint, controlPoint, controlPoint, startPoint);
    const tweenObj = { t: 0 };
    const duration = 250 + stacks*100

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

export function sendPokemonCharge(pokemon: PokemonOnBoard, chargeDelta: number, chargeAngle: number, game: GameScene){
    const sprite = game.sprites.get(pokemon.uid)
    if(!sprite) return;
    let {x, y} = sprite
    const attackSpeed = 5000000 / (pokemon.speed+25) / game.gameSpeed       
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
        }
    });
}