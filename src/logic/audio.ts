import baragouin from "baragouin";
import { store } from "../utils/store";
import {gameState} from "./gamestate";

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
        params = Object.assign({ volume: store.MUSIC_VOLUME }, params)
        console.log("playing "+name)
        if (gameState.music && gameState.music.isPlaying) {
            if(gameState.music.key === name) return; // already playing
            gameState.music.stop();
        }
        try {
            if (scene.cache.audio.has(name)) {
                gameState.music = gameState.activeScene?.sound.add(name, params) as Phaser.Sound.WebAudioSound;
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
    params = Object.assign({ volume: store.SFX_VOLUME }, params)
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

export function initVolumeControls(){
    const musicVolumeInput = document.getElementById("volume_music") as HTMLInputElement;
    musicVolumeInput.value = (store.MUSIC_VOLUME*100).toString()
    musicVolumeInput.onchange = () => {
        store.MUSIC_VOLUME = +musicVolumeInput.value / 100
        gameState.music?.setVolume(store.MUSIC_VOLUME)
    }

    const sfxVolumeInput = document.getElementById("volume_sfx") as HTMLInputElement;
    sfxVolumeInput.value = (store.SFX_VOLUME*100).toString()
    sfxVolumeInput.onchange = () => {
        store.SFX_VOLUME = +sfxVolumeInput.value / 100
    }
}

export function launchSpeech(line: string){
    return baragouin(
        line,
        Object.assign(
            {
                onNote(text: string) {
                    gameState.activeDialog?.textSprite.setText(text)
                },
                onEnd(text: string) {
                    gameState.activeDialog?.textSprite.setText(text)
                    delete gameState.activeDialog?.speech
                }
            },
            gameState.activeDialog?.voice,
            { volume: store.SFX_VOLUME * 100 }
        )
    )
}