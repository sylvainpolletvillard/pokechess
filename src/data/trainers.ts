import {gameState} from "../logic/gamestate";
import { BADGE_ROCHE } from "./badges";
import {receiveItem} from "./dialogs/descriptions";
import {ITEM_POKEBALL} from "./items";
import {DialogLine} from "../logic/dialog";
import { spawnTutoCaptureTeam, spawnTutoCaptureTeamStep2 } from "../logic/spawns";
import { drawPokeballsCounter } from "../objects/gui";
import { MyScene } from "../scenes/MyScene";
import { spawnPokemon } from "../logic/board";
import Game from "../scenes/GameScene";

export interface Trainer {
    name: string;
    frameIndex: number,
    introFrameIndex: number | null,
    dialogs: {
        start: DialogLine[],
        victory: DialogLine[],
        defeat: DialogLine[],
        [other: string]: DialogLine[]
    }
}

export const PIERRE: Trainer = {
    name: "pierre",
    frameIndex: 8,
    introFrameIndex: 0,
    dialogs:{
        start: [
            `Je suis Pierre ! Je suis le Champion d'Argenta !`,
            `Je crois en la grande résistance de la pierre !`,
            `C'est pourquoi mes Pokémon sont des élémentaires de pierre !`,
            `Tu veux toujours te battre avec moi ? Très bien. En garde !`
        ],
        victory: [
            `Hmm... Beau combat. En reconnaissance de ta victoire, voici le Badge Roche !`,
            () => {
                gameState.receiveBadge(BADGE_ROCHE);
                return `C'est un Badge officiel de la Ligue Pokémon !` 
            },
            `Il te permet de contrôler un Pokémon de plus dans ton équipe.`,
            `Tu sembles être un Dresseur d'exception !`,
            `Va maintenant à l'Arène d'Azuria pour tester tes capacités.`
        ],
        defeat: [
            `Tes Pokémon n'ont pas pu passer ma défense de pierre...`,
            `Entraîne-les et reviens m'affronter quand tu seras assez fort.`
        ]
    }
}

export const ONDINE: Trainer = {
    name: "ondine",
    frameIndex: 9,
    introFrameIndex: 1,
    dialogs:{
        start: [`Je suis Ondine`],
        victory: [`J'ai perdu ! Voilà le badge Cascade.`],
        defeat: [`T'es nul !`]
    }
}

export const MAJOR_BOB: Trainer = {
    name: "major_bob",
    frameIndex: 10,
    introFrameIndex: 2,
    dialogs:{
        start: [`Je suis le major Bob`],
        victory: [`J'ai perdu ! Voilà le badge Foudre.`],
        defeat: [`T'es nul !`]
    }
}

export const ERIKA: Trainer = {
    name: "erika",
    frameIndex: 11,
    introFrameIndex: 3,
    dialogs:{
        start: [`Je suis Erika`],
        victory: [`J'ai perdu ! Voilà le badge Fleur.`],
        defeat: [`T'es nul !`]
    }
}

export const KOGA: Trainer = {
    name: "koga",
    frameIndex: 12,
    introFrameIndex: 4,
    dialogs:{
        start: [`Je suis Koga`],
        victory: [`J'ai perdu ! Voilà le badge Poubelle.`],
        defeat: [`T'es nul !`]
    }
}

export const MORGANE: Trainer = {
    name: "morgane",
    frameIndex: 13,
    introFrameIndex: 5,
    dialogs:{
        start: [`Je suis Morgane`],
        victory: [`J'ai perdu ! Voilà le badge Cerveau.`],
        defeat: [`T'es nul !`]
    }
}

export const AUGUSTE: Trainer = {
    name: "auguste",
    frameIndex: 14,
    introFrameIndex: 6,
    dialogs:{
        start: [`Je suis Auguste, champion de Cramoisîle !`,`Et je pète le feu !`],
        victory: [`J'ai gagné !`, `J'ai perdu ! Voilà le badge Volcan.`],
        defeat: [`J'ai perdu !`, `T'es nul !`]
    }
}

export const GIOVANNI: Trainer = {
    name: "giovanni",
    frameIndex: 15,
    introFrameIndex: 7,
    dialogs:{
        start: [
            `Je dois dire que je suis surpris que tu sois arrivé jusqu'ici !`,
            `Maintenant tu vas affronter Giovanni, le plus grand des dresseurs !`
        ],
        victory: [
            `C'était un combat intense. Et tu as gagné !`,
            `Comme preuve de ta maîtrise comme dresseur Pokémon, voici le badge Terre.`,
            `Avec ce dernier badge, tu peux désormais défier la Ligue Pokémon.`
        ],
        defeat: [
            `Ha ha ! Tu pensais être à la heureur face au chef de la Team Rocket ?`
        ]
    }
}

export const HECTOR: Trainer = {
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


export const SALLY: Trainer = {
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

export const SBIRE_ROCKET: Trainer = {
    name: "sbire_rocket",
    frameIndex: 18,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Eh toi là, qu'est-ce que tu fiches ici ?`,
            `Quoi ? Tu veux affronter le champion d'arène, notre chef Giovanni ?`,
            `Laisse-moi rire ! Tu ne lui arrives pas à la cheville !`,
            `Essaie déjà de me battre, et je songerais à te laisser passer.`,
        ],
        victory: [
            `Hmpff ! Tu es plus coriace que tu en as l'air... Mais ça ne change rien !`,
            `Giovanni n'est pas là et tu n'es pas à la hauteur de toute façon.`,
            `Reviens plus tard quand tu auras une vraie équipe.`
        ],
        defeat: [
            `Allez, dégage d'ici minus, et reviens quand tu auras une vraie équipe !`
        ]
    }
}

export const SCIENTIFIQUE_TUTO: Trainer = {
    name: "scientifique_tuto",
    frameIndex: 19,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Une minute ! Si tu veux monter une équipe, il te faut des Pokéballs !`,
            `Tiens, voilà 5 Pokéballs pour capturer tes premiers Pokémons.`,
            () => {
                gameState.player.inventory[ITEM_POKEBALL.ref] += 5;
                drawPokeballsCounter(gameState.activeScene as MyScene)
                return `Sais-tu comment on s'en sert ?`
            },
            {
                "Oui": () => [
                    `Très bien, alors capture ces Pokémons sauvages. Ou mets-les KO, comme tu veux !`
                ],
                "Non": () => [
                    `Si tu ne veux pas affronter des Pokémons sauvages, tu peux les capturer.`,
                    `Plus le Pokémon est puissant, plus il te faudra de Pokéballs pour le capturer.`,
                    `Un Pokémon capturé rejoint ta box, qui peut contenir jusqu'à 8 Pokémons.`,
                    `Tu peux ensuite les déplacer de ta box vers le terrain pour qu'ils combattent.`
                ]
            }           
        ],
        step2: [
            `Tes Pokémon deviennnent plus fort en gagnant de l'expérience après un combat.`,
            `Mais il existe une autre manière de faire monter en expérience un Pokémon.`,
            `Il suffit de capturer un Pokémon sauvage de la même espèce.`,
            `Il partagera son expérience avec ton Pokémon avant d'être relâché.`,
            () => {
                spawnTutoCaptureTeamStep2();
                spawnPokemon(gameState.board.otherTeam[0], gameState.activeScene as Game)
                return `Tiens, essaie tout de suite. Essaie de capturer mon ${gameState.player.team[0].name}.`
            },
            `Plus le niveau du Pokémon capturé est élevé, plus il donnera d'expérience`,
            `Rappelle-toi, cela marche uniquement si les Pokémon sont de la même espèce !`
        ],
        victory: [],
        defeat: []
    }
}