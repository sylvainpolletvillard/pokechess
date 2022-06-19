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

export const VOICES_BY_ACTOR: { [name: string]: VoiceConfig } = {
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
    pierre: {
        emotion: 50,
        pitch: 25,
        speed: 15,
        resonance: 10
    },
    ondine: {
        emotion: 70,
        pitch: 50,
        speed: 20,
        resonance: 10
    },
    major_bob: {
        emotion: 75,
        pitch: 20,
        speed: 20,
        resonance: 10
    },
    erika: {
        emotion: 30,
        pitch: 40,
        speed: 15,
        resonance: 10
    },
    koga: {
        emotion: 40,
        pitch: 27,
        speed: 35,
        resonance: 10
    },
    morgane: {
        emotion: 80,
        pitch: 55,
        speed: 20,
        resonance: 30
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
    hector: {
        emotion: 50,
        pitch: 38,
        speed: 25,
        resonance: 10
    },
    sally: {
        emotion: 70,
        pitch: 43,
        speed: 20,
        resonance: 20
    },
    rival: {
        emotion: 90,
        pitch: 33,
        speed: 35,
        resonance: 30
    },
    olga: {
        emotion: 70,
        pitch: 47,
        speed: 25,
        resonance: 30
    },
    aldo: {
        emotion: 80,
        pitch: 23,
        speed: 30,
        resonance: 30
    },
    agatha: {
        emotion: 80,
        pitch: 39,
        speed: 25,
        resonance: 30
    },
    peter: {
        emotion: 40,
        pitch: 26,
        speed: 20,
        resonance: 30
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
    pc: {
        voice: "triangle",
        emotion: 0,
        pitch: 10,
        speed: 30
    },
    male1: {
        emotion: 15,
        pitch: 20,
        speed: 35,
        resonance: 5
    },
    male2: {
        emotion: 10,
        pitch: 25,
        speed: 30,
        resonance: 5
    },
    male3: {
        emotion: 20,
        pitch: 28,
        speed: 35,
        resonance: 5
    },
    female1: {
        emotion: 25,
        pitch: 40,
        speed: 30,
        resonance: 5
    },
    female2: {
        emotion: 25,
        pitch: 46,
        speed: 35,
        resonance: 5
    },
    female3: {
        emotion: 20,
        pitch: 51,
        speed: 35,
        resonance: 5
    },
    kid1: {
        emotion: 35,
        pitch: 55,
        speed: 40,
        resonance: 5
    },
    kid2: {
        emotion: 42,
        pitch: 60,
        speed: 40,
        resonance: 5
    }
}

export const VOICES_BY_SPRITE_INDEX: { [index: number]: VoiceConfig } = {
    0: VOICES_BY_ACTOR.red,
    1: VOICES_BY_ACTOR.mam,
    2: VOICES_BY_ACTOR.chen,
    3: VOICES_BY_ACTOR.assistant1,
    4: VOICES_BY_ACTOR.seller_male,
    5: VOICES_BY_ACTOR.seller_female,
    6: VOICES_BY_ACTOR.kid1,
    7: VOICES_BY_ACTOR.kid2,
    8: VOICES_BY_ACTOR.male3,
    9: VOICES_BY_ACTOR.female3,
    10: VOICES_BY_ACTOR.male2,
    11: VOICES_BY_ACTOR.female2,
    12: VOICES_BY_ACTOR.male1,
    13: VOICES_BY_ACTOR.female1,
    14: VOICES_BY_ACTOR.female2,
    15: VOICES_BY_ACTOR.male2,
    16: VOICES_BY_ACTOR.male1,
    17: VOICES_BY_ACTOR.male1,
    18: VOICES_BY_ACTOR.female1,
    19: VOICES_BY_ACTOR.male2,
    20: VOICES_BY_ACTOR.female2,
    21: VOICES_BY_ACTOR.male2,
    22: VOICES_BY_ACTOR.female2,
    23: VOICES_BY_ACTOR.assistant2,
    24: VOICES_BY_ACTOR.female2
}

for(let index in VOICES_BY_SPRITE_INDEX) VOICES_BY_ACTOR["character"+index] = VOICES_BY_SPRITE_INDEX[index]