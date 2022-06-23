import {gameState} from "./gamestate";

const MUSIC_VOLUME = 0.2
const SFX_VOLUME = 0.2

export function preloadMusic(name: string, filepath: string){
    const scene = gameState.activeScene!;
    
    if (!scene.cache.audio.has(name)) {
        scene.load.audio(name, [filepath]);
        scene.load.start();
    }
}

export function startMusic(name: string, params: Phaser.Types.Sound.SoundConfig = {}): Promise<void> {
    const scene = gameState.activeScene!;
    return new Promise((resolve, reject) => {
        params = Object.assign({ volume: MUSIC_VOLUME }, params)
        console.log("playing "+name)
        if (gameState.music && gameState.music.isPlaying) {
            if(gameState.music.key === name) return; // already playing
            gameState.music.stop();
        }
        try {
            if (scene.cache.audio.has(name)) {
                gameState.music = gameState.activeScene?.sound.add(name, params);
                gameState.music!.play();
                gameState.music!.on(Phaser.Sound.Events.COMPLETE, () => resolve())
            } else {
                scene.load.once("filecomplete", () => startMusic(name));
            }
        } catch(error){
            reject(error)
        }
    })
}

let lastSoundPlayed: Phaser.Sound.BaseSound | null = null;

export function pauseMusicAndPlaySound(name: string){
    gameState.music?.pause()
    if(lastSoundPlayed != null) lastSoundPlayed.stop()
    const { sound, waitEnd } = playSound(name)    
    lastSoundPlayed = sound

    waitEnd.then(() => {
        gameState.music?.resume()
        lastSoundPlayed = null
    })
}

export function playSound(name: string, params: Phaser.Types.Sound.SoundConfig = {}): { sound: Phaser.Sound.BaseSound, waitEnd: Promise<void> } {
    params = Object.assign({ volume: SFX_VOLUME }, params)
    console.log("playing sound "+name)

    const sound = gameState.activeScene?.sound.add(name, params)!;
    sound.play();
    return {
        sound,
        waitEnd: new Promise(resolve => {        
            sound.on(Phaser.Sound.Events.COMPLETE, () => resolve())
        })
    }
}