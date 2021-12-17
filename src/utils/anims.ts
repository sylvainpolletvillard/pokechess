export function declareAnim(
    animManager: Phaser.Animations.AnimationManager | Phaser.Animations.AnimationState,
    texture: string,
    key: string,
    frames: number[],
    frameRate: number=0,
    repeat: number = -1){

    animManager.create({
        key,
        frames: animManager.generateFrameNumbers(texture, { frames }),
        frameRate,
        repeat
    })
}


type AnimConfig = [
    key: string,
    frames: number[],
    frameRate?: number,
    repeat?: number
]

export function declareAnims(
    animManager:  Phaser.Animations.AnimationManager | Phaser.Animations.AnimationState,
    texture: string,
    anims: AnimConfig[]
){
    anims.forEach(anim => declareAnim(animManager, texture, ...anim))
}