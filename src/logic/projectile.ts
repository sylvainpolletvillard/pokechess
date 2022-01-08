import {ProjectileSkill} from "./skill";
import {PokemonOnBoard} from "../objects/pokemon";
import GameScene from "../scenes/GameScene";
import {distanceBetweenPokemon} from "./pathfinding";
import {getCoordsFromPosition, getPokemonOnTile} from "./board";
import {OWNER_PLAYER} from "../data/owners";

export function launchProjectile(
    skill: ProjectileSkill,
    origin: PokemonOnBoard,
    target: PokemonOnBoard,
    game: GameScene
): Promise<PokemonOnBoard[]> {
    let [x,y] = origin.position
    let [targetX,targetY] = target.position
    const distance = distanceBetweenPokemon(origin, target)
    const travelTime = 1000 * distance / skill.travelSpeed

    const projectileSprite = game.add.sprite(x, y, "effects")

    projectileSprite.scale = skill.effect.scale ?? 0.5;
    projectileSprite.blendMode = Phaser.BlendModes.OVERLAY

    projectileSprite.play(skill.effect.key)

    console.log("launch projectile, duration: "+travelTime)

    return new Promise(resolve => {
        game.tweens.add({
            targets: projectileSprite,
            x: targetX,
            y: targetY,
            duration: travelTime,
            ease: 'Linear',
            onComplete(){
                if(skill.hitEffect){
                    projectileSprite.play(skill.hitEffect.key)
                    projectileSprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                        projectileSprite.destroy()
                    })
                } else {
                    projectileSprite.destroy()
                }
                const [i,j] = getCoordsFromPosition(targetX, targetY)
                const finalTarget = getPokemonOnTile(i, j) // on regarde si la cible a bougé pendant le déplacement, ou a été remplacé par une autre
                if(finalTarget && finalTarget.owner !== OWNER_PLAYER){
                    console.log("touché !")
                    resolve([finalTarget])
                } else {
                    console.log("raté !")
                    resolve([]) // missed !
                }
            }
        });
    })
}