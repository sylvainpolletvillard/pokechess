export interface VoiceConfig {
    voice?: string;
    emotion?: number
    pitch?: number
    speed?: number
    resonance?: number
    volume?: number
    skipSpeech?: boolean
}

export const DEFAULT_VOICE: VoiceConfig = {
    voice: "sawtooth",
    emotion: 20,
    pitch: 30,
    speed: 40,
    resonance: 10,

}

export const voicesByActor: { [name: string]: VoiceConfig } = {
    system: {
        emotion: 0,
        volume: 1,
        speed: 50,
        pitch: 10,
    },
    chen: {
        emotion: 25,
        pitch: 25,
        speed: 35,
        resonance: 15
    },
    mam: {
        emotion: 50,
        pitch: 60,
        speed: 40,
        resonance: 5
    },
    red: {
        volume: 0 // intense thinking
    },
    auguste: {
        emotion: 80,
        pitch: 45,
        speed: 20,
        resonance: 10
    },
    giovanni: {
        emotion: 90,
        pitch: 20,
        speed: 10,
        resonance: 50
    },
    sbire_rocket: {
        emotion: 90,
        pitch: 40,
        speed: 30,
        resonance: 30
    },
    assistant1: {
        emotion: 10,
        pitch: 30,
        speed: 40,
        resonance: 15
    },
    assistant2: {
        emotion: 15,
        pitch: 35,
        speed: 45,
        resonance: 15
    },
    scientifique_tuto: {
        emotion: 10,
        pitch: 20,
        speed: 30,
        resonance: 5
    },
    seller_male: {
        emotion: 15,
        pitch: 22,
        speed: 40,
        resonance: 5
    },
    seller_female: {
        emotion: 15,
        pitch: 50,
        speed: 40,
        resonance: 5
    },
}
