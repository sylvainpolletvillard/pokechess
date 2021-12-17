import {wait} from "./helpers";

export function tweenPop(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite, delay=1000): Promise<void>{
    sprite.setAlpha(0).setScale(0)
    scene.tweens.timeline({
        tweens: [
            {
                targets: sprite,
                scale: 1,
                alpha: 1,
                ease: 'Elastic',
                easeParams: [1.5,0.8],
                duration: 400
            },
            {
                targets: sprite,
                alpha: 0,
                scale: 1,
                duration: 400,
                delay
            }
        ]
    })
    return wait(delay + 400)
}

export function tweenFade(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite, delay = 1000): Promise<void>{
    sprite.setAlpha(0)
    scene.tweens.timeline({
        tweens: [
            {
                targets: sprite,
                alpha: 1,
                duration: 400
            },
            {
                targets: sprite,
                alpha: 0,
                duration: 400,
                delay
            }
        ]
    })
    return wait(delay + 800)
}