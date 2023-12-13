import {gameState} from "../logic/gamestate";

export interface Champion {
    name: string;
    frameIndex: number,
    introFrameIndex: number | null,
    dialogs: {
        start: Array<string | (() => string)>,
        victory: Array<string | (() => string)>,
        defeat: Array<string | (() => string)>
    }
}

export const PIERRE: Champion = {
    name: "pierre",
    frameIndex: 8,
    introFrameIndex: 0,
    dialogs:{
        start: [`E:Je suis Pierre`],
        victory: [`E:J'ai perdu ! Voilà le badge Roche.`],
        defeat: [`E:T'es nul !`]
    }
}

export const ONDINE: Champion = {
    name: "ondine",
    frameIndex: 9,
    introFrameIndex: 1,
    dialogs:{
        start: [`E:Je suis Ondine`],
        victory: [`E:J'ai perdu ! Voilà le badge Cascade.`],
        defeat: [`E:T'es nul !`]
    }
}

export const MAJOR_BOB: Champion = {
    name: "major_bob",
    frameIndex: 10,
    introFrameIndex: 2,
    dialogs:{
        start: [`E:Je suis le major Bob`],
        victory: [`E:J'ai perdu ! Voilà le badge Foudre.`],
        defeat: [`E:T'es nul !`]
    }
}

export const ERIKA: Champion = {
    name: "erika",
    frameIndex: 11,
    introFrameIndex: 3,
    dialogs:{
        start: [`E:Je suis Erika`],
        victory: [`E:J'ai perdu ! Voilà le badge Fleur.`],
        defeat: [`E:T'es nul !`]
    }
}

export const KOGA: Champion = {
    name: "koga",
    frameIndex: 12,
    introFrameIndex: 4,
    dialogs:{
        start: [`E:Je suis Koga`],
        victory: [`E:J'ai perdu ! Voilà le badge Poubelle.`],
        defeat: [`E:T'es nul !`]
    }
}

export const MORGANE: Champion = {
    name: "morgane",
    frameIndex: 13,
    introFrameIndex: 5,
    dialogs:{
        start: [`E:Je suis Morgane`],
        victory: [`E:J'ai perdu ! Voilà le badge Cerveau.`],
        defeat: [`E:T'es nul !`]
    }
}

export const AUGUSTE: Champion = {
    name: "auguste",
    frameIndex: 14,
    introFrameIndex: 6,
    dialogs:{
        start: [`E:Je suis Auguste, champion de Cramoisîle !`,`E:Et je pète le feu !`],
        victory: [`J'ai gagné !`, `E:J'ai perdu ! Voilà le badge Volcan.`],
        defeat: [`J'ai perdu !`, `E:T'es nul !`]
    }
}

export const GIOVANNI: Champion = {
    name: "giovanni",
    frameIndex: 15,
    introFrameIndex: 7,
    dialogs:{
        start: [
            `E:Je dois dire que je suis surpris que tu sois arrivé jusqu'ici !`,
            `E:Maintenant tu vas affronter Giovanni, le plus grand des dresseurs !`
        ],
        victory: [
            `E:C'était un combat intense. Et tu as gagné !`,
            `E:Comme preuve de ta maîtrise comme dresseur Pokémon, voici le badge Terre.`,
            `E:Avec ce dernier badge, tu peux désormais défier la Ligue Pokémon.`
        ],
        defeat: [
            `E:Ha ha ! Tu pensais être à la heureur face au chef de la Team Rocket ?`
        ]
    }
}

export const HECTOR: Champion = {
    name: "hector",
    frameIndex: 16,
    introFrameIndex: 8,
    dialogs: {
        start: [
            `Je suis Hector`
        ],
        victory: [
            `J'ai perdu`
        ],
        defeat: [
            `J'ai gagné`
        ]
    }
}


export const SALLY: Champion = {
    name: "sally",
    frameIndex: 17,
    introFrameIndex: 9,
    dialogs: {
        start: [
            `Je suis Sally`
        ],
        victory: [
            `J'ai perdu`
        ],
        defeat: [
            `J'ai gagné`
        ]
    }
}

export const SBIRE_ROCKET: Champion = {
    name: "sbire_rocket",
    frameIndex: 18,
    introFrameIndex: null,
    dialogs:{
        start: [
            `E:Quoi ? Tu veux affronter le champion d'arène, notre chef Giovanni ?`,
            `E:Laisse-moi rire ! Tu ne lui arrives pas à la cheville !`,
            `E:Essaie déjà de me battre, et je songerais à te laisser passer.`,
        ],
        victory: [
            `E:Hmpff ! Tu es plus coriace que tu en as l'air... Mais ça ne change rien !`,
            `E:Giovanni n'est pas là et tu n'es pas à la hauteur de toute façon.`,
            `E:Reviens plus tard quand tu auras une vraie équipe.`
        ],
        defeat: [
            `E:Allez, dégage d'ici minus, et reviens quand tu auras une vraie équipe !`
        ]
    }
}

export const SCIENTIFIQUE_TUTO: Champion = {
    name: "scientifique_tuto",
    frameIndex: 19,
    introFrameIndex: null,
    dialogs:{
        start: [
            `E:Une minute ! Ne me dis pas que tu comptes te mesurer à Auguste notre champion ?`,
            `E:Ton Pokémon n'est pas encore assez fort ! Laisse-moi t'expliquer.`,
            `E:Tes Pokémon deviennnent plus fort en gagnant de l'expérience après un combat.`,
            `E:Mais il existe une autre manière de faire monter en expérience un Pokémon.`,
            `E:Il suffit de capturer un Pokémon sauvage de la même espèce.`,
            `E:Il partagera son expérience avec ton Pokémon avant d'être relâché.`,
            () => `E:Tiens, essaie tout de suite. Essaie de capturer mon ${gameState.player.team[0].name}.`,
        ],
        victory: [
            `E:Plus le niveau du Pokémon capturé est élevé, plus il donnera d'expérience`,
            `E:Rappelle-toi, cela marche uniquement si les Pokémon sont de la même espèce !`,
            `E:Entraîne tes Pokémons et reviens quand tu seras prêt à affronter Auguste.`
        ],
        defeat: []
    }
}