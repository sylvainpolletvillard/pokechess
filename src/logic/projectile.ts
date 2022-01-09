import {ProjectileSkill} from "./skill";
import {PokemonOnBoard} from "../objects/pokemon";
import GameScene from "../scenes/GameScene";
import {distanceBetweenPokemon} from "./pathfinding";
import {getCoordsFromPosition, getPokemonOnTile} from "./board";
import {OWNER_PLAYER} from "../data/owners";
import { applyDamage } from "./fight";
import { GameStage, gameState } from "./gamestate";
import { wait } from "../utils/helpers";

interface Projectile {
    sprite: Phaser.GameObjects.Sprite
    skill: ProjectileSkill
    attacker: PokemonOnBoard
    impactedPokemonIds: string[]
    tween?: Phaser.Tweens.Tween
}

export const projectiles: Set<Projectile> = new Set()

export function launchProjectile(
    skill: ProjectileSkill,
    origin: PokemonOnBoard,
    target: PokemonOnBoard,
    game: GameScene
) {
    let [x,y] = origin.position
    let [targetX,targetY] = target.position
    const distance = distanceBetweenPokemon(origin, target)    
    const angle = Math.atan2(target.y - origin.y, target.x - origin.x)
    let travelTime = 1000 * distance / skill.travelSpeed

    const projectile: Projectile = {
        sprite: game.add.sprite(x, y, "effects"),
        skill,
        attacker: origin,
        impactedPokemonIds: []        
    }

    projectiles.add(projectile)

    if(skill.rotateProjectile){        
        projectile.sprite.rotation = angle;
    }
    if(skill.pierceThrough){
        // cible dans la direction de la cible, mais suffisamment loin pour sortir de l'écran        
        targetX = Math.round(x + Math.cos(angle) * 12 * 32)
        targetY = Math.round(y + Math.sin(angle) * 12 * 32)
        travelTime = 1000 * 12 / skill.travelSpeed
    }

    projectile.sprite.scale = skill.effect.scale ?? 0.5;
    projectile.sprite.blendMode = Phaser.BlendModes.OVERLAY
    projectile.sprite.play(skill.effect.key)

    projectile.tween = game.tweens.add({
        targets: projectile.sprite,
        x: targetX,
        y: targetY,
        duration: travelTime,
        ease: 'Linear',
        onComplete(){
            if(projectiles.has(projectile)) destroyProjectile(projectile)
        }
    });
}

export function destroyProjectile(projectile: Projectile){
    if(!projectiles.has(projectile)) return; // alreayd destroyed
    const game = gameState.activeScene as GameScene;
    projectiles.delete(projectile)
    projectile.tween && game.tweens.remove(projectile.tween)
    if(projectile.skill.hitEffect){
        projectile.sprite.play(projectile.skill.hitEffect.key)
        projectile.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            projectile.sprite.destroy()
        })
    } else {
        projectile.sprite.destroy()
    }    
}

export function checkProjectilesImpact(){
    projectiles.forEach(projectile => {
        let {x,y} = projectile.sprite
        x+=8; y+=8; // try to better center for collision detection
        const r = projectile.skill.projectileRadius
        const targetsCovered = new Set([ [x-r, y-r], [x+r, y-r], [x-r, y+r], [x+r, y+r] ]
            .map(([x,y]) => getCoordsFromPosition(x,y))
            .map(([i,j]) => getPokemonOnTile(i, j))
            .filter(target => target != null)
        )

        targetsCovered.forEach(target => {
            if(target && target.owner !== OWNER_PLAYER && !projectile.impactedPokemonIds.includes(target.uid)){                
                projectile.impactedPokemonIds.push(target.uid)
                wait(Math.floor(1000 / projectile.skill.travelSpeed)).then(() => {
                    applyDamage(projectile.skill, target, projectile.attacker)
                    if(!projectile.skill.pierceThrough) destroyProjectile(projectile)
                })                
            }
        })
    })
}