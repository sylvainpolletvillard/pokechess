import {gameState} from "./gamestate";

const MUSIC_VOLUME = 0.1

export function startMusic(name: string, params: Phaser.Types.Sound.SoundConfig = {}): Promise<void> {
    return new Promise(resolve => {
        params = Object.assign({ volume: MUSIC_VOLUME }, params)
        console.log("playing "+name)
        if (gameState.music && gameState.music.isPlaying) {
            gameState.music.stop();
        }
        try {
            gameState.music = gameState.activeScene?.sound.add(name, params);
            gameState.music!.play();
            gameState.music!.on(Phaser.Sound.Events.COMPLETE, () => resolve())
        } catch(e){
            console.warn(e)
        }
    })
}

export function pauseMusicAndPlaySound(name: string){
    const previousMusic = gameState.music?.key;
    return startMusic(name, { loop: false }).then(() => {
        if(previousMusic && previousMusic !== name) startMusic(previousMusic).then(() => {})
    })
}