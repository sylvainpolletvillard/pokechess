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

export function tweenFadeIn(scene: Phaser.Scene, object: Phaser.GameObjects.Sprite | Phaser.GameObjects.Group, duration = 400): Promise<void>{
    scene.tweens.add({
        targets: object instanceof Phaser.GameObjects.Group ? object.getChildren() : object,
        alpha: {
            from: 0,
            to: 1
        },
        duration
    })
    return wait(duration)
}

export function tweenFadeOut(scene: Phaser.Scene, object: Phaser.GameObjects.Sprite | Phaser.GameObjects.Group, duration = 400): Promise<void>{
    scene.tweens.add({
        targets: object instanceof Phaser.GameObjects.Group ? object.getChildren() : object,
        alpha: {
            from: 1,
            to: 0
        },
        duration
    })
    return wait(duration)
}

export function tweenFadeInOut(scene: Phaser.Scene, sprite: Phaser.GameObjects.Sprite, delay = 1000, duration = 400): Promise<void>{
    sprite.setAlpha(0)
    scene.tweens.timeline({
        tweens: [
            {
                targets: sprite,
                alpha: 1,
                duration
            },
            {
                targets: sprite,
                alpha: 0,
                duration,
                delay
            }
        ]
    })
    return wait(delay + duration*2)
}