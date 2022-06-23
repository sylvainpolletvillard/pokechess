import {GameStage, gameState} from "../logic/gamestate";
import { BADGE_AME, BADGE_CASCADE, BADGE_FOUDRE, BADGE_MARAIS, BADGE_PRISME, BADGE_ROCHE, BADGE_TERRE, BADGE_VOLCAN } from "./badges";
import {ITEM_FILET, ITEM_PARAPLUIE, ITEM_POKEBALL} from "./items";
import { spawnTutoCaptureTeamStep2 } from "../logic/spawns";
import { spawnPokemon } from "../logic/board";
import { sendBackToPokeball } from "../logic/fight";
import GameScene from "../scenes/GameScene";
import { receiveItem } from "./dialogs/descriptions";
import {wait} from "../utils/helpers";
import {Trainer} from "../types/trainer";
import { startMusic } from "../logic/audio";


export const PIERRE: Trainer = {
    ref: "pierre",
    name: "Pierre",
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
            `Tu sembles être un Dresseur d'exception !`,
            `En reconnaissance de ta victoire, voici le BADGE ROCHE !`,
            () => {
                gameState.receiveBadge(BADGE_ROCHE);
                return `C'est un Badge officiel de la Ligue Pokémon !` 
            },
            `Il t'en faudra huit pour pouvoir affronter le Conseil des 4.`
        ],
        defeat: [
            `Tes Pokémon n'ont pas pu passer ma défense de pierre...`,
            `Entraîne-les et reviens m'affronter quand tu seras assez fort.`
        ]
    }
}

export const ONDINE: Trainer = {
    ref: "ondine",
    name: "Ondine",
    frameIndex: 9,
    introFrameIndex: 1,
    dialogs:{
        start: [
            `Salut ! T'es un nouveau ?`,
            `Si tu veux être un vrai dresseur, il te faut une stratégie !`,
            `C'est quoi ta tactique pour capturer les Pokémon sauvages ?`,
            `Moi je leur fonce dans le tas avec mes Pokémon aquatiques !`],
        victory: [
            `Whouha ! T'es super fort ! Très bien !`,
            `Je te donne le BADGE CASCADE pour m'avoir battue!`,
            () => {
                gameState.receiveBadge(BADGE_CASCADE);
                return `Ce badge t'ouvre le chemin vers la grotte au nord d'Azuria.`
            }            
        ],
        defeat: [
            `Haha, on dirait que ton équipe a pris l'eau !`,
            `Il va te falloir trouver une autre tactique.`
        ]
    }
}

export const MAJOR_BOB: Trainer = {
    ref: "major_bob",
    name: "Major Bob",
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
    ref: "erika",
    name: "Erika",
    frameIndex: 11,
    introFrameIndex: 3,
    dialogs:{
        start: [
            `Bonjour et sois le bienvenu. Il fait beau, n'est-ce pas?`,
            `J'aime la vie. J'aime les fleurs et les chansons. C'est chou, non?`,
            `Moi, c'est ERIKA, la Championne de l'arène de Céladopole.`,
            `L'arrangement floral est ma spécialité.`,
            `Mes Pokémon sont du type plante.`,
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
                    `Chaque badge obtenu te fait affronter des Pokémon plus forts.`,
                    `Tu l'avais remarqué ?`
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
    ref: "koga",
    name: "Koga",
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
    ref: "morgane",
    name: "Morgane",
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
    ref: "auguste",
    name: "Auguste",
    frameIndex: 14,
    introFrameIndex: 6,
    dialogs:{
        start: [
            `Salutations. Mon nom est... Auguste !`,
            `Je suis le Champion de l'Arène de Cramois'Île !`,
            `Mes Pokémon flamboyants vont te réduire en cendres !`,
            `Haha ! Il va bientôt faire très chaud !`
        ],
        victory: [
            `Vlouff ! Je me suis fait vaporiser !`,
            `Tu as gagné le badge Volcan !`,
            () => {
                gameState.receiveBadge(BADGE_VOLCAN);
                return [
                    `Plus tu possèdes de badges, plus les combats sont coriaces !`,
                    `C'est le prix à payer pour monter jusqu'à la Ligue !`
                ]
            }
        ],
        defeat: [`Maintenant tu sais de quel bois je me chauffe !`]
    }
}

export const GIOVANNI: Trainer = {
    ref: "giovanni",
    name: "Giovanni",
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
                return [
                    `Une fois les 8 badges obtenus, tu peux te confronter à la Ligue Pokémon.`,
                    `Tu peux y accéder par la Route Victoire à l'ouest d'ici.`
                ]
            },
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
    ref: "hector",
    name: "Hector",
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
            `Ce coin regorge de Pokémon exotiques, tu devrais y repasser !`
        ],
        defeat: [
            `Les Pokémon insecte ont des talents cachés.`,
            `Il faudra encore du temps pour tous les découvrir.`,
            `Étudies-les minutieusement.`
        ]
    }
}


export const SALLY: Trainer = {
    ref: "sally",
    name: "Sally",
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
            `Félicitations pour cette victoire! Je me suis follement amusée !`,
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
            `Commencerais-tu enfin à comprendre ce qu'est la féérie ?`
        ]
    }
}

export const CHAMPIONS = [
    PIERRE,
    ONDINE,
    MAJOR_BOB,
    ERIKA,
    KOGA,
    MORGANE,
    GIOVANNI,
    AUGUSTE,
    SALLY,
    HECTOR
]

export const OLGA: Trainer = {
    ref: "olga",
    name: "Olga",
    frameIndex: 45,
    introFrameIndex: null,
    dialogs: {
        start: [
            `Bienvenue à la Ligue Pokémon !`,
            `Je zuis Olga du Conzeil des 4 !`,
            `Je zuis la maîtrezze des Pokémon de glaze !`,
            `Et la glaze... Z'est drop fort !`,
            `Tes Pokémon zeront à ma merzi une fois gelés !`,
            `Ach ! Ach ! Ach ! Z'est parti !`,            
        ],
        victory: [
            `Tu es fort. Z'est bien.`,
            `Mais la Ligue Pokémon te rézerve d'autre zurprizes !`
        ],
        defeat: [
            `Comment as-tu ozé venir ici ?`,
        ]
    }
}

export const ALDO: Trainer = {
    ref: "aldo",
    name: "Aldo",
    frameIndex: 46,
    introFrameIndex: null,  
    dialogs: {
        start: [
            `Mon nom est Aldo du Conseil des 4 !`,
            `Ma passion à moi et à mes Pokémon, c'est la muscu !`,
            `Pour frimer sur la plage ou pour boxer les nabots,`,
            `rien de tel qu'un corps de rêve !`,
            `Ton équipe... J'vais en faire du yaourt ! A table !`,            
        ],
        victory: [
            `Bien joué, p'tit ! La prochaine t'attend !`,            
        ],
        defeat: [
            `Vlan ! Dans les dents !`,
        ]
    }
}

export const AGATHA: Trainer = {
    ref: "agatha",
    name: "Agatha",
    frameIndex: 47,
    introFrameIndex: null,  
    dialogs: {
        start: [
            `Gnnn... Bonjour mon tout petit.`,
            `Je suis Agatha du Conseil des 4 !`,
            `Chen mise de grands espoirs sur toi, fiston !`,
            `Sais-tu que ce vieux machin était jadis un beau garçon ?`,
            `Enfin... Il y a très longtemps !`,
            `Il veut juste frimer avec son Pokédex !`,            
            `Mais c'est débile ! Les Pokémon servent à combattre !`,
            `Je vais te montrer comment les grands Dresseurs combattent !`
        ],
        victory: [
            `Mmmm... Je vois pourquoi le vieux Chen t'apprécie autant !`,
            `Mes ombres ont perdu. Tu peux passer.`,
        ],
        defeat: [
            `Tu as du talent, mais c'est insuffisant !`,
        ]
    }
}

export const PETER: Trainer = {
    ref: "peter",
    name: "Peter",
    frameIndex: 48,
    introFrameIndex: null,  
    dialogs: {
        start: [
            `Ah ! Enfin... J'ai entendu parler de toi !`,
            `Je règne sur le Conseil des 4 !`,
            `Mon nom est Peter le Dresseur de Dragons !`,
            `Les dragons sont des Pokémon mystiques !`,
            `Les capturer et les entraîner est difficile mais leurs pouvoirs sont supérieurs !`,
            `Ils sont presque invincibles !`,            
            `Le glas de la défaite et de la honte sonne pour toi...`,
            `L'entends-tu ?`
        ],
        victory: [
            `Comment mes dragons ont-il pu succomber à tes attaques?`,
            `Tu es désormais le Maître de la Ligue Pokémon !`,
            `Enfin... Pas tout à fait.`,
            `Une épreuve doit encore t'être imposée...`,
            `Un autre grand Dresseur t'attend.`,
            `Il a vaincu le Conseil des 4 avant toi !`,
            `C'est le vrai Maître de la Ligue Pokémon !`
        ],
        defeat: [
            `Je n'abandonne jamais. Et toi ?`,
        ]
    }
}

export const RIVAL: Trainer = {
    ref: "rival",
    name: "Blue",
    frameIndex: 49,
    introFrameIndex: null,  
    dialogs: {
        start: [
            `Salut minable. Je t'attends depuis une bonne plombe !`,
            `Ton devoir en tant que rival est d'entraîner mes Pokémon.`,
            `En améliorant mon Pokédex, j'ai recherché les Pokémon surpuissants!`,
            `J'ai créé l'équipe ultime, efficace contre tous les types de Pokémon!`,
            `Ça t'épate, hein ?`,
            `Je suis le Maître! Tu sais c'que ça veut dire?`,
            `Je suis le dresseur le plus puissant du monde! Yaaa!`
        ],
        victory: [
            `Qu... Comm... Hein? Moi? Pourquoi? WHAAAAAAAAAAA!`,
            `J'ai entraîné mes Pokémon à la perfection... Et zut alors!`,
            `Tu es le nouveau Maître! Alors ça... Ça me la coupe`
        ],
        defeat: [
            `Tu m'as amusé un peu !`,
            `T'es vraiment un minable !`,
            `Mais je crois que tu commences à le savoir, minable!`
        ]
    }
}

export const CHAMPIONS_LIGUE = [
    OLGA,
    ALDO,
    AGATHA,
    PETER,
    RIVAL
]

export const SCIENTIFIQUE_TUTO_DIALOG_STATE = {
    BEFORE_WILD: 0,
    AFTER_WILD: 1,
    AFTER_CAPTURE_SELF: 2    
}

export const SCIENTIFIQUE_TUTO: Trainer = {
    ref: "scientifique_tuto",
    name: "Assistant du Prof Chen",
    frameIndex: 19,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Une minute ! Si tu veux monter une équipe, il te faut des Pokéballs !`,
            `Tiens, voilà 5 Pokéballs pour capturer tes premiers Pokémon.`,
            () => {
                gameState.dialogStates["scientifique_tuto"] = SCIENTIFIQUE_TUTO_DIALOG_STATE.BEFORE_WILD
                return receiveItem(ITEM_POKEBALL, 5)
            },
            `Sais-tu comment on s'en sert ?`,
            {
                "Oui": () => [
                    `Très bien, alors capture ces Pokémon sauvages. Ou mets-les KO, comme tu veux !`
                ],
                "Non": () => [
                    `Tu peux capturer un Pokémon sauvage plutôt que de l'affronter.`,
                    `Plus le Pokémon est puissant, plus il te faudra de Pokéballs pour le capturer.`,
                    `Un Pokémon capturé rejoint ta box, qui peut contenir jusqu'à 8 Pokémon.`,
                    `Tu peux ensuite les déplacer de ta box vers le terrain pour qu'ils combattent.`,
                    `Vas-y, essaie de capturer ces Pokémon sauvages !`
                ]
            }           
        ],
        victory: [
            `Bien, tu sembles te débrouiller comme un chef !`
        ],
        defeat: [
            () => {
                gameState.board.otherTeam.forEach(pokemon => sendBackToPokeball(pokemon))
                // make scientist capture remaining wild Pokémon
                return `La prochaine fois, sers-toi de mes Pokéballs !`
            },
            `Tu augmenteras nettement tes chances de victoire !`
        ],
        step2: [
            () => {
                startMusic("music_guide")
                return `Tes Pokémon deviennnent plus fort en gagnant de l'expérience après un combat.`
            },
            `Mais il existe une autre manière de faire monter en expérience un Pokémon.`,
            `Il suffit de capturer un Pokémon sauvage de la même espèce.`,
            `Il partagera son expérience avec ton Pokémon avant d'être relâché.`,
            () => {
                let playerPokemon = gameState.player.team[0].entry
                gameState.board.playerTeam.forEach(pokemon => sendBackToPokeball(pokemon))
                gameState.dialogStates["scientifique_tuto"] = SCIENTIFIQUE_TUTO_DIALOG_STATE.AFTER_WILD
                wait(500).then(() => {
                    const game = gameState.activeScene as GameScene
                    gameState.stage = GameStage.CAPTURE
                    gameState.board.otherTeam = spawnTutoCaptureTeamStep2(playerPokemon);                    
                    spawnPokemon(gameState.board.otherTeam[0], game)
                })
                return `Tiens, essaie tout de suite. Essaie de capturer mon ${playerPokemon.name}.`
            }            
        ],
        step3: [
            `Plus le niveau du Pokémon capturé est élevé, plus il donnera d'expérience`,
            `Rappelle-toi, cela marche uniquement si les Pokémon sont de la même espèce !`,
            `Bien, tu sais tout. Bon voyage et bonne chance!`
        ]
    }
}

export const SBIRE_ROCKET: Trainer = {
    ref: "sbire_rocket",
    name: "Sbire Rocket",
    frameIndex: 18,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Giovanni est peut-être parti, mais la Team Rocket ne meurt jamais !`,
            `J'ai bien l'intention de prendre sa place ! A l'attaque !`
        ],
        victory: [
            `La Team Rocket s'envole vers d'autres cieux ! `
        ],
        defeat: [
            `Mouahaha ! C'est la renaissance de la team Rocket !`
        ]
    }
}

export const SBIRE_ROCKET_TUTO: Trainer = {
    ref: "sbire_rocket",
    name: "Sbire Rocket",
    frameIndex: 18,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Eh toi là, qu'est-ce que tu fiches ici ?`,
            `Ici c'est le territoire de Giovanni, notre chef et maître de l'arène !`,
            `Quoi ? Tu comptes te mesurer à lui ? Laisse-moi rire !`,
            `Je vais te montrer la puissance de la Team Rocket !`,
        ],
        victory: [
            `Hmpff ! Tu es plus coriace que tu en as l'air... `,
            `Mais ça ne change rien ! Giovanni va te régler ton compte !`,
            `Reviens plus tard quand tu auras une vraie équipe.`
        ],
        defeat: [
            `Allez, dégage d'ici minus, et reviens quand tu auras une vraie équipe !`
        ]
    }
}

export const DRESSEUR_COL_DE_MONTAGNE: Trainer = {
    ref: "dresseur_col_de_montagne",
    name: "Sébastien l'ornithologue",
    frameIndex: 20,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Salut blanc-bec, tu t'es perdu ?`,
            `Ne compte pas sur moi pour te prendre sous mon aile !`,
            `Moi je cherche plutôt la prise de bec !`
        ],
        victory: [
            `Ouille, j'ai du plomb dans l'aile ! Bisous je m'envole !`
        ],
        defeat: [
            `Va-t'en à tire-d'aile avant d'y laisser des plumes !`
        ]
    }
}

export const DRESSEUR_DOJO: Trainer = {
    ref: "dresseur_jojo",
    name: "Koichi le Karatéka",
    frameIndex: 21,
    introFrameIndex: null,
    dialogs:{
        start: [
            `P'tit faiblard ! Je suis le GRAND MAITRE de KARATE !`,
            `Tu me provoques ? Tu veux t'battre ?`,
            `Tu cherches le contact ? HAHAHA ! Ayaaaaa !`
        ],
        victory: [
            `STOP ! Tu m'as battu ! J'ai honte !`,
            `OK, tu as gagné ! Mais ne va pas le crier sur tous les toits !`
        ],
        defeat: [
            `Ton entraînement n'est pas encore suffisant ! Ayaaaaa !`
        ]
    }
}

export const DRESSEUR_FALAISES: Trainer = {
    ref: "dresseur_falaises",
    name: "Maurice le Montagnard",
    frameIndex: 22,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Salut petit gars ! Je suis le plus grand grimpeur de Kanto !`,
            `Et j'ai bien l'intention de me hisser au sommet !`,
            `Un combat ? C'est dans mes cordes !`
        ],
        victory: [
            `Bon, j'ai perdu, on va pas en faire toute une montagne !`
        ],
        defeat: [
            `Alors, on est sur la corde raide ?`
        ]
    }
}

export const DRESSEUR_SAFRANIA: Trainer = {
    ref: "dresseur_safrania",
    name: "Polo le Kinésiste",
    frameIndex: 23,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Tu oses revenir ici ? Tu as perdu l'esprit ?`,
            `Nous autres adeptes Psy nous battons à la force du mental !`,
            `Ma puissance va te faire tourner la tête !`
        ],
        victory: [
            `Tu m'as donné la migraine !`
        ],
        defeat: [
            `La force brute ne vaut rien contre la puissance de l'intellect !`
        ]
    }
}

export const DRESSEUR_PISTE_CYCLABLE: Trainer = {
    ref: "dresseur_piste_cyclable",
    name: "Karl le Loubard",
    frameIndex: 24,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Allez gamin, aboule ton quatre heures ! J'ai faim !`,
            `Essaie pas de fuir ! Mate un peu ma bécane !`,
            `Tu n'iras pas loin avec ta petite bicyclette !`
        ],
        victory: [
            `Raaah t'as rayé la carroserie ! Vite, au garage !`
        ],
        defeat: [
            `Allez, je mets les gaz, à plus gros naze !`
        ]
    }
}

export const DRESSEUR_ILES_ECUME: Trainer = {
    ref: "dresseur_iles_ecume",
    name: "Fabien le Pêcheur",
    frameIndex: 25,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Fais pas de bruit, tu fais fuir les poissons !`
        ],
        victory: [
            `J'aurais pas de belles prises aujourd'hui...`
        ],
        defeat: [
            `Je suis frais comme un gardon !`
        ]
    }
}

export const DRESSEUR_CENTRALE: Trainer = {
    ref: "dresseur_centrale",
    name: "Bernard le mécano",
    frameIndex: 26,
    introFrameIndex: null,
    dialogs: {
        start: [
            `Hé, t'as pété les plombs ?`,
            `C'est pas un endroit pour les enfants ici !`,
            `Mon équipe de Pokémon va te foudroyer !`
        ],
        victory: [
            `Je me suis pris un sacré coup de jus !`
        ],
        defeat: [
            `C'était une victoire éclair !`
        ]
    }
}

export const DRESSEUR_FORET_JADE: Trainer = {
    ref: "dresseur_foret_jade",
    name: "Calvin le Gamin",
    frameIndex: 27,
    introFrameIndex: null,
    dialogs: {
        start: [
            `T'es un dresseur Pokémon ? Moi aussi !`,
            `J'ai capturé plein de Pokémon insectes !`,
            `Maintenant on doit faire un combat, c'est la règle !`
        ],
        victory: [
            `Je vais le dire à ma mère !`
        ],
        defeat: [
            `Ouaiiiis j'ai gagné pour la première fois !`
        ]
    }
}

export const DRESSEUR_AZURIA: Trainer = {
    ref: "dresseur_azuria",
    name: "Anya la nageuse",
    frameIndex: 28,
    introFrameIndex: null,
    dialogs:{
        start: [
            `De l'eau a coulé sous les ponts depuis ta victoire contre Ondine.`,
            `Je suis plus fraîche que jamais ! Attends-toi à un raz de marée !`
        ],
        victory: [
            `Gloups, j'ai bu la tasse !`
        ],
        defeat: [
            `Alors, ta stratégie a pris l'eau ?`
        ]
    }
}

export const DRESSEUR_LAVANVILLE: Trainer = {
    ref: "dresseur_lavanville",
    name: "Henri le gentilhomme",
    frameIndex: 29,
    introFrameIndex: null,
    dialogs: {
        start: [
            `Sally m'a beaucoup parlé de vous.`,
            `Me ferez-vous l'honneur d'un combat ?`
        ],
        victory: [
            `C'était un combat magique, je n'aurais pas rêvé mieux.`
        ],
        defeat: [
            `Allez vous reposer, la nuit porte conseil. Et croyez en vos rêves !`
        ]
    }
}

export const DRESSEUR_MONT_SELENITE: Trainer = {
    ref: "dresseur_mont_selenite",
    name: "Arthur le paléontologue",
    frameIndex: 30,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Je suis à la recherche de fossiles, tu n'en aurais pas vu ?`
        ],
        victory: [
            `Il semblerait que ce soit moi le fossile...`
        ],
        defeat: [
            `Tu ne feras pas de vieux os ici, mieux vaut que tu partes.`
        ]
    }
}

export const DRESSEUR_OCEANE: Trainer = {
    ref: "dresseur_oceane",
    name: "Firmin le Marin",
    frameIndex: 31,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Ahoy, marin d'eau douce !`,
            `La traversée va être longue...`,
            `Faisons un combat pour passer le temps !`,
            `Prêt ? Larguez les amarres !`,
        ],
        victory: [
            `Bon, je dois aller souquer les artimuses... Bon vent !`
        ],
        defeat: [
            `J'ai le vent en poupe aujourd'hui !`,
            `Allez, les perdants à la cale ! Ha ha, je rigole !`
        ]
    }
}

export const DRESSEUR_MR_PSY: Trainer = {
    ref: "mr_psy",
    name: "Monsieur Psy",
    frameIndex: 32,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Ah, te revoilà ! Alors, as-tu entraîné le mental de tes Pokémon ?`,
            `C'est l'heure de... l'évaluation !`,
        ],
        victory: [
            `C'est un 10/10 ! Tu es diplômé de l'école de Monsieur Psy !`
        ],
        defeat: [
            `Quelle déception !`,
            `Reviens me voir et je te laisserai capturer d'autres Pokémon Psy`,
            `Ton équipe a besoin d'améliorer son mental !`
        ]
    }
}

export const DRESSEUR_CHAMPS_VERDOYANTS: Trainer = {
    ref: "dresseur_champs_verdoyants",
    name: "Isabelle la Fleuriste",
    frameIndex: 33,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Tiens ? Qui es-tu à arriver comme une fleur ?`,
            `C'est mon coin ici ! Je vais t'envoyer sur les roses !`,
        ],
        victory: [
            `Mon équipe a été envoyée dans les pâquerettes !`,
            `Raaaah tu m'as mis les nerfs à fleur de peau !`
        ],
        defeat: [
            `Je vais te faire une fleur et te donner un conseil:`,
            `Même les plus belles roses ont besoin d'épines.`,
            `Il te faut une bonne attaque si tu veux gagner.`
        ]
    }
}

export const DRESSEUR_CAMP_NOMADE: Trainer = {
    ref: "dresseur_camp_nomade",
    name: "Nancy la scout",
    frameIndex: 34,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Minute Papillon !`,
            `Je vais te montrer ma collection d'insectes !`,
            `Attends-toi à un combat pas piqué des hannetons !`
        ],
        victory: [
            `Aïe ! Je me suis fait piquer par un moustique !`
        ],
        defeat: [
            `Alors, tu as des fourmis dans les jambes ?`
        ]
    }
}

export const DRESSEUR_CELADOPOLE: Trainer = {
    ref: "dresseur_celadopole",
    name: "Valentine la Citadine",
    frameIndex: 35,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Je t'ai déjà croisé en ville, non ?`,
            `Je peux te faire entrer dans les clubs de dresseurs les plus chics ici !`,
            `Mais tu dois d'abord prouver que tu le mérites ! À l'attaque !`
        ],
        victory: [
            `Mais euh ! Tu étais censé me laisser gagner !`,
            `Vous autres provinciaux n'avez aucun savoir vivre !`
        ],
        defeat: [
            `Finalement je n'ai plus trop envie qu'on traîne ensemble, hi hi !`
        ]
    }
}

export const DRESSEUR_ARGENTA: Trainer = {
    ref: "dresseur_argenta",
    name: "Roche le géologue",
    frameIndex: 36,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Tu as vaincu Pierre, mais moi je suis solide comme un roc !`,
        ],
        victory: [
            `Je crois que j'ai un caillou dans ma chaussure...`
        ],
        defeat: [
            `Alors, on a un coup de calcaire ?`
        ]
    }
}

export const DRESSEUR_GROTTE_AZUREE: Trainer = {
    ref: "dresseur_grotte_azuree",
    name: "Ugo le vieux sage",
    frameIndex: 37,
    introFrameIndex: null,
    dialogs:{
        start: [
            `Hmmm... Drôle d'endroit pour une rencontre.`,
            `Laisse moi briser la glace. En garde !`
        ],
        victory: [
            `Ma défense a fondu comme neige au soleil !`
        ],
        defeat: [
            `Hmm... Ton équipe s'est fait refroidir.`,
            `Que fais-tu encore ici ? Tu attends le dégel ?`
        ]
    }
}

export const DRESSEUR_CARMIN: Trainer = {
    ref: "dresseur_carmin",
    name: "Elton le Rocker",
    frameIndex: 38,
    introFrameIndex: null,
    dialogs: {
        start: [
            `Hey t'es venu pour mon concert ? L'ambiance est électrique ici !`,
            `Comment ça, non ? T'as jamais écouté mon CD ?!`,
            `Je vais pas te laisser gâcher la fête !`
        ],
        victory: [
            `Ça y est t'as ruiné l'ambiance !`
        ],
        defeat: [
            `Ça c'est du rock !!!`
        ]
    }
}

export const DRESSEUR_TOUR_POKEMON: Trainer = {
    ref: "dresseur_tour_pokemon",
    name: "Gwen l'Exorciste",
    frameIndex: 39,
    introFrameIndex: null,
    dialogs: {
        start: [
            `Arrière, démon !!!`
        ],
        victory: [
            `AaAaaaAaaah !!! Fuyez pour vos vies !!!`
        ],
        defeat: [
            `Ça... ? Ça a marché ?`,
            `Les démons ne prennent pas les coups d'habitude...`
        ]
    }
}

export const DRESSEUR_PENSION_DIALOG_STATE = {
    hello: 0,
    has_met: 1,
    has_deposed: 2
}

export const DRESSEUR_PENSION: Trainer = {
    ref: "dresseur_pension",
    name: "Gaël de la Pension",
    frameIndex: 40,
    introFrameIndex: null,
    dialogs: {
        start() {
            if(gameState.dialogStates["pension"] === DRESSEUR_PENSION_DIALOG_STATE.has_met) return [
                `Tiens, c'est toi ! Tu viens nous confier des Pokémon ?`
            ]

            if(gameState.dialogStates["pension"] === DRESSEUR_PENSION_DIALOG_STATE.has_deposed) return [
                `Ah, te revoilà ! Tes Pokémon ont bien grandi, regarde !`
            ]

            gameState.dialogStates["pension"] = DRESSEUR_PENSION_DIALOG_STATE.has_met
            return [
                `Bienvenue à la Pension !`,
                `Ici on prend soin des Pokémon quand leur propriétaire doit s'absenter.`,
                `Tu peux nous confier certains de tes Pokémon si tu veux.`,
                `Il y a aussi des Pokémon qui ne cherchent qu'à être adoptés !`,
                `Leur type est banal alors ils n'intéressent pas les autres dresseurs...`
            ]
        },
        bye(){
            if(gameState.dialogStates["pension"] === DRESSEUR_PENSION_DIALOG_STATE.has_deposed) return [
                `Je prendrais soin de tes Pokémon en ton absence !`
            ]
            return [ `Reviens quand tu veux !` ]
        }
    }
}

export const DRESSEUR_CAVE_TAUPIQUEUR: Trainer = {
    ref: "dresseur_cave_taupiqueur",
    name: "Joe le Cambrioleur",
    frameIndex: 41,
    introFrameIndex: null,
    dialogs: {
        start: [
            `Hein ? Non, c'est pas moi !`,
            `J'ai un alibi ! J'étais au cinéma !`,
        ],
        victory: [
            `Pas la peine de s'énerver ! Tiens, prends ces Pokéballs !`,
            `Et... on dit que tu ne m'as jamais vu, OK ?`
        ],
        defeat: [
            `Ça t'apprendra à venir fouiner dans les coins sombres !`
        ]
    }
}

export const DRESSEUR_COLLINE_ROYALE: Trainer = {
    ref: "dresseur_colline_royale",
    name: "Norbert le Fan de Dragons",
    frameIndex: 42,
    introFrameIndex: null,
    dialogs: {
        start: [
            `Tu cherches des Pokémon Dragons ?`,
            `Moi aussi ! Moi aussi !`,
            `Ils sont si grands ! si beaux ! si majestueux !`,
            `Ils sont à moi ! Tu m'entends ? À moi seul !`
        ],
        victory: [
            `La force ancestrale du dragon m'a abandonné !`
        ],
        defeat: [
            `Mes dragons sont si forts ! si terrifiants !`,
            `si puissants ! si... ah, il est parti.`
        ]
    }
}

export const DRESSEUR_MONT_BRAISE: Trainer = {
    ref: "dresseur_mont_braise",
    name: "Duo Ron & Mya les Casse-Cous",
    frameIndex: 43,
    introFrameIndex: null,
    dialogs: {
        start: [
            `Eh bien que fait un jeune garçon dans un endroit pareil ?`,
            `Tu n'as pas froid aux yeux, toi !`,
            `Hé Ron, si on lui faisait un baptême du feu ?`
        ],
        victory: [
            `Cessez-le-feu ! Viens Ron, on s'en va !`
        ],
        defeat: [
            `Tu vois ce que ça fait d'être pris entre deux feux !`
        ]
    }
}

export const DRESSEUR_PARMANIE: Trainer = {
    ref: "sbire_rocket",
    name: "Sbire Rocket",
    frameIndex: 44,
    introFrameIndex: null,
    dialogs: {
        start: [
            `Dégage sale morveux !`,
            `La Team Rocket mène des opérations secrètes ici !`
        ],
        victory: [
            `La team Rocket s'envole vers d'autres cieux !`
        ],
        defeat: [
            `Nous sommes de retour...`,
            `Pour vous jouer un mauvais tour...`
        ]
    }
}

export const DRESSEUR_CRAMOISILE: Trainer = {
    ref: "dresseur_cramoisile",
    name: "Isaac le Scientifique",
    frameIndex: 19,
    introFrameIndex: null,
    dialogs: {
        start: [
            `Ah, un nouveau sujet d'expérience !`,
            `Laisse-moi te montrer le fruit de mes recherches...`
        ],
        victory: [
            `Mes calculs ne sont pas bons !`
        ],
        defeat: [
            `Euréka !`
        ]
    }
}