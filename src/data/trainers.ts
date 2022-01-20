import {GameStage, gameState} from "../logic/gamestate";
import { BADGE_AME, BADGE_CASCADE, BADGE_FOUDRE, BADGE_MARAIS, BADGE_PRISME, BADGE_ROCHE, BADGE_TERRE, BADGE_VOLCAN } from "./badges";
import {ITEM_FILET, ITEM_PARAPLUIE, ITEM_POKEBALL} from "./items";
import {DialogLine} from "../logic/dialog";
import { spawnTutoCaptureTeamStep2 } from "../logic/spawns";
import { drawPokeballsCounter } from "../objects/pokeballsCounter";
import { MyScene } from "../scenes/MyScene";
import { spawnPokemon } from "../logic/board";
import { sendBackToPokeball } from "../logic/fight";
import GameScene from "../scenes/GameScene";
import { receiveItem } from "./dialogs/descriptions";

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
            `Hmm... Beau combat.`,
            `En reconnaissance de ta victoire, voici le BADGE ROCHE !`,
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
        start: [
            `Salut ! T'es un nouveau ?`,
            `Si tu veux être un vrai dresseur, il te faut une stratégie !`,
            `C'est quoi ta tactique pour capturer les pokémons sauvages ?`,
            `Moi je leur fonce dans le tas avec mes pokémons aquatiques !`],
        victory: [
            `Whouha ! T'es super fort ! Très bien !`,
            `Je te donne le BADGE CASCADE pour m'avoir battue!`,
            () => {
                gameState.receiveBadge(BADGE_CASCADE);
                return `Il t'ouvre aussi le chemin vers la grotte au nord d'Azuria.` 
            },
        ],
        defeat: [
            `Haha, on dirait que ton équipe a pris l'eau !`,
            `Il va te falloir trouver une autre tactique.`
        ]
    }
}

export const MAJOR_BOB: Trainer = {
    name: "major_bob",
    frameIndex: 10,
    introFrameIndex: 2,
    dialogs:{
        start: [
            `Hé, gamin ! Tu fais quoi là ?`,
            `Tu ne résisterais pas longtemps en temps de guerre !`,
            `Je vais te dire, mes Pokémon Électriques m'ont sauvé la vie !`,
            `Et ouais ! Ils ont paralysé mes ennemis avec leurs éclairs !`,
            `Une vraie boucherie ! Y va t'arriver la même chose !`,
            `Compte tes dents ! Tu vas morfler !`
        ],
        victory: [
            `Whoo ! Gard'vous ! T'es un dur, mon p'tit gars !`,
            `Très bien, prends le BADGE FOUDRE !`,
            () => {
                gameState.receiveBadge(BADGE_FOUDRE);
                return `T'en auras besoin pour rentrer dans la Ligue Pokémon.` 
            }
        ],
        defeat: [
            `Ha ! Une défaite foudroyante !`,
            `Un p'tit conseil, gamin ! L'électricité est très puissante !`,
            `Mais elle est inutile face à des Pokémon de la terre !`
        ]
    }
}

export const ERIKA: Trainer = {
    name: "erika",
    frameIndex: 11,
    introFrameIndex: 3,
    dialogs:{
        start: [
            `Bonjour et sois le bienvenu. Il fait beau, n'est-ce pas?`,
            `J'aime la vie. J'aime les fleurs et les chansons. C'est chou, non?`,
            `Moi, c'est ERIKA, la Championne de l'arène de Céladopole.`,
            `L'arrangement floral est ma spécialité.`,
            `Mes Pokémons sont du type plante.`,
            `Il fit grand froid hier, alors j'ai mis un pull.`,
            `Hein? Tu veux te battre? Bah... Dis-le, mon vieux !`,
            `Tu sais quoi? Tu vas perdre!`
        ],
        victory: [
            `Oh! J'ai perdu? Bien joué. C'est mérité.`,
            `Je te confie le BADGE PRISME.`,
            () => {
                gameState.receiveBadge(BADGE_PRISME);
                return [
                    `Chaque badge te permet de contrôler un Pokémon de plus`,
                    `sur le terrain, tu le savais ?`
                ]                
            }
        ],
        defeat: [
            `Perdre fait toujours un peu mal mais...`,
            `Combattre un bon adversaire est stimulant... `,
            `Allez, ne reste pas planté là !`            
        ]
    }
}

export const KOGA: Trainer = {
    name: "koga",
    frameIndex: 12,
    introFrameIndex: 4,
    dialogs:{
        start: [
            `Gwahahaha ! Un nain ose me défier ?`,
            `Moi, le grand le beau le terrible Koga ?`,
            `Par l'enfer, par le sang, par l'acier, j'vais gagner !`,
            `Puisse la poigne de mes poisons pétrifier de peur tes petits Pokémon !`,
        ],
        victory: [
            `Gwaha... heu ? Tu as prouvé ta valeur !`,
            `Ouvre ta mimine, car voici... le BADGE ÂME !`,
            () => {
                gameState.receiveBadge(BADGE_AME);
                return [
                    `J'ai combattu de toutes mes forces...`,
                    `Mais... Je ne suis pas assez fort.`,
                    `Va dans la prochaine arène ! Explore tes limites !`,
                    `Bonne chance !`,
                ]                
            }
        ],
        defeat: [
            `Ha ha ! Il est temps de t'apprendre que certains Pokémon`,
            `ne peuvent pas être vaincus par la force pure !`
        ]
    }
}

export const MORGANE: Trainer = {
    name: "morgane",
    frameIndex: 13,
    introFrameIndex: 5,
    dialogs:{
        start: [
            `J'avais prédit ton arrivée !`,
            `J'ai des pouvoirs psychiques depuis l'enfance.`,
            `J'ai appris à plier les cuillères par la force de mon esprit.`,
            `C'est pas super utile, mais ça en jette !`,
            `Je n'aime pas les combats, mais si tu insistes, je vais te montrer mes pouvoirs !`
        ],
        victory: [
            `Ha! Je suis surprise ! Tu as gagné.`,
            `C'est vrai, je n'ai pas fait de mon mieux !`,
            `Tu mérites ta victoire ! Tu gagnes le BADGE MARAIS !`,
            () => {
                gameState.receiveBadge(BADGE_MARAIS);
                return [
                    `Le Badge Marais renforce les pouvoirs occultes...`,
                    `Et ça... C'est pas de la gnognotte.`,
                    `Tu deviendras un Maître ! Je le sens !`
                ]                
            }
        ],
        defeat: [
            `C'est exactement ce que j'avais prédit.`
        ]
    }
}

export const AUGUSTE: Trainer = {
    name: "auguste",
    frameIndex: 14,
    introFrameIndex: 6,
    dialogs:{
        start: [
            `Salutations. Mon nom est... Auguste !`,
            `Je suis le Champion de l'Arène de Cramois'Île !`,
            `Mes Pokémon flamboyants vont te réduire en cendres !`,
            `Haha ! Y va bientôt faire très chaud !`
        ],
        victory: [
            `Vlouff ! Je me suis fait vaporiser !`,
            `Tu as gagné le badge Volcan !`,
            () => {
                gameState.receiveBadge(BADGE_VOLCAN);
                return `Plus tu possèdes de badges, plus ton équipe sera grande !`
            }
        ],
        defeat: [`Maintenant tu sais de quel bois je me chauffe !`]
    }
}

export const GIOVANNI: Trainer = {
    name: "giovanni",
    frameIndex: 15,
    introFrameIndex: 7,
    dialogs:{
        start: [
            `Je dois dire que je suis surpris que tu sois arrivé jusqu'ici !`,
            `Te voici dans mon repaire ! Je compte reformer la Team Rocket ici !`,
            `Tu oses me défier, moi, le grand Giovanni ? Tu vas déguster !`
        ],
        victory: [
            `Ah ! Voilà ce que j'appelle du combat ! Tu as gagné !`,
            `En récompense voici le badge Terre !`,
            () => {
                gameState.receiveBadge(BADGE_TERRE);
                return `Une fois les 8 badges obtenus, tu pourras accéder à la Ligue Pokémon !`
            },
            `Comme preuve de ta maîtrise comme dresseur Pokémon, voici le badge Terre.`,
            `Je ne suis pas digne d'être le chef de la Team Rocket !`,
            `Ainsi, son existence s'achève avec ma défaite !`,
            `Je vais me retirer, loin, en ermite, pour étudier les Pokémon !`,
            `Un jour, nos chemins se croiseront à nouveau ! Adieu !`
        ],
        defeat: [
            `Tu élèves tes Pokémon trop soigneusement.`,
            `Un gosse comme toi ne peut pas comprendre mes plans !`
        ]
    }
}

export const HECTOR: Trainer = {
    name: "hector",
    frameIndex: 16,
    introFrameIndex: 8,
    dialogs: {
        start: [
            `Tiens, tu as trouvé mon camp ? Moi, c'est Hector!`,            
            `Je suis venu étudier les Pokémon Insecte de cette région.`,
            `Personne ne connait mieux les Pokémon Insecte que moi!`,
            `Quand je serai adulte, je serai un grand expert en Pokémon Insecte!`,
            `Tu veux que je te montre ?`,
            `Prépare toi à admirer le résultat de mes recherches!`
        ],
        victory: [
            `Wah, Ça alors ! Tu connais vraiment bien les Pokémon !`,
            `Ah, j'ai encore beaucoup à apprendre! ... `,
            `Oui, je sais ! Prends mon filet à insecte comme récompense !`,
            () => {
                return receiveItem(ITEM_FILET)
                .then(() => `Tu verras, il te sera très utile !`)
            },
            `Bien, je vais lever le camp. J'ai fini ce que j'avais à faire ici.`,
            `Ce coin regorge de Pokémons rares, tu devrais y repasser !`
        ],
        defeat: [
            `Les Pokémon insecte ont des talents cachés.`,
            `Il faudra encore du temps pour tous les découvrir.`,
            `Étudies-les minutieusement.`
        ]
    }
}


export const SALLY: Trainer = {
    name: "sally",
    frameIndex: 17,
    introFrameIndex: 9,
    dialogs: {
        start: [
            `Tiens, tiens. J'ai entendu parler de toi, mon enfant.`,
            `Je suis Sally, la championne d'arène de Corrifey de la région de Galar.`,
            `Je suis venu à Lavanville pour rendre visite à un vieil ami...`,
            `Cet endroit a quelque-chose de féérique à mes yeux.`,
            `Bien, que dirais-tu d'un combat ?`,
            `Ça m'intéresserait de voir comment tu te bats...`,            
        ],
        victory: [
            `Félicitations pour cette victoire ! Je me suis follement amusée !`,            
            `Même si j'ai passé l’âge pour ce genre de choses...`,
            `Tu me rappelles mon mari dans ces jeunes années.`,
            `Tu sais quoi ? Tu devrais prendre ce parapluie.`,
            () => {
                return receiveItem(ITEM_PARAPLUIE)
                .then(() => `Il m'a été très utile lors de mes voyages`)
            },
            `Allez, ouste ! Tu as une Ligue à affronter !`
        ],
        defeat: [
            `C'est beau, l'énergie de la jeunesse.`,
            `Mais la puissance des attaques ne fait pas tout...`,
            `Commencerais-tu enfin à comprendre ce qu'est la féérie ?`
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

export const SCIENTIFIQUE_TUTO_DIALOG_STATE = {
    BEFORE_WILD: 0,
    AFTER_WILD: 1,
    AFTER_CAPTURE_SELF: 2    
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
                gameState.dialogStates["scientifique_tuto"] = SCIENTIFIQUE_TUTO_DIALOG_STATE.BEFORE_WILD
                return `Sais-tu comment on s'en sert ?`
            },
            {
                "Oui": () => [
                    `Très bien, alors capture ces Pokémons sauvages. Ou mets-les KO, comme tu veux !`
                ],
                "Non": () => [
                    `Tu peux capturer un Pokémon sauvage plutôt que de l'affronter.`,
                    `Plus le Pokémon est puissant, plus il te faudra de Pokéballs pour le capturer.`,
                    `Un Pokémon capturé rejoint ta box, qui peut contenir jusqu'à 8 Pokémons.`,
                    `Tu peux ensuite les déplacer de ta box vers le terrain pour qu'ils combattent.`
                ]
            }           
        ],
        victory: [
            `Bien, tu sembles te débrouiller comme un chef !`
        ],
        defeat: [
            () => {
                // make scientist capture remaining wild Pokémon
                return `La prochaine fois, sers-toi de mes Pokéballs !`
            },
            `Tu augmenteras nettement tes chances de victoire !`
        ],
        step2: [
            `Tes Pokémon deviennnent plus fort en gagnant de l'expérience après un combat.`,
            `Mais il existe une autre manière de faire monter en expérience un Pokémon.`,
            `Il suffit de capturer un Pokémon sauvage de la même espèce.`,
            `Il partagera son expérience avec ton Pokémon avant d'être relâché.`,
            () => {
                gameState.board.playerTeam.forEach(pokemon => sendBackToPokeball(pokemon))                
                gameState.dialogStates["scientifique_tuto"] = SCIENTIFIQUE_TUTO_DIALOG_STATE.AFTER_WILD
                gameState.stage = GameStage.PLACEMENT
                gameState.board.otherTeam = spawnTutoCaptureTeamStep2();
                spawnPokemon(gameState.board.otherTeam[0], gameState.activeScene as GameScene)
                return `Tiens, essaie tout de suite. Essaie de capturer mon ${gameState.player.team[0].name}.`
            }            
        ],
        step3: [
            `Plus le niveau du Pokémon capturé est élevé, plus il donnera d'expérience`,
            `Rappelle-toi, cela marche uniquement si les Pokémon sont de la même espèce !`,
            `Bien, tu sais tout. Bon voyage et bonne chance!`
        ]
    }
}