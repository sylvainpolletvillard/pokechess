import { pauseMusicAndPlaySound } from "../../logic/audio";
import { addToBox } from "../../logic/box";
import { startDialog } from "../../logic/dialog";
import { gameState } from "../../logic/gamestate";
import { DialogLine } from "../../types/dialog";
import { ARGENTA } from "../destinations/argenta";
import { AZURIA } from "../destinations/azuria";
import { CARMIN } from "../destinations/carmin";
import { CELADOPOLE } from "../destinations/celadopole";
import { CRAMOISILE } from "../destinations/cramoisile";
import { JADIELLE } from "../destinations/jadielle";
import { LAVANVILLE } from "../destinations/lavanville";
import { LIGUE } from "../destinations/ligue";
import { PARMANIE } from "../destinations/parmanie";
import { SAFRANIA } from "../destinations/safrania";
import { FOSSILES, FOSSILE_AMONITA, FOSSILE_KABUTO, FOSSILE_PTERA } from "../items";
import { OWNER_PLAYER } from "../owners";
import { Pokemon } from "../pokemons";
import { AMONITA } from "../pokemons/amonita";
import { KABUTO } from "../pokemons/kabuto";
import { PTERA } from "../pokemons/ptera";

export const GUIDE = () => startDialog(GUIDES[gameState.currentDestination.ref] || ["Salut ?"], { 
    speaker: `character${16 + (gameState.currentDestination.shopId ?? 0) % 10}` 
})

export const GUIDES: { [destination: string]: DialogLine[] } = {
    [JADIELLE.ref]: [
        `J'ai voulu aller sur la route Victoire à l'ouest, mais on ne m'a pas laissé passer...`,
        `Seuls ceux qui ont les huit badges d'arène peuvent accéder au plateau Indigo.`,
        `C'est pas juste ! Je veux aller voir les Champions de la Ligue !`
    ],
    [ARGENTA.ref]: [
        `La montagne qui culmine au dessus d'Argenta est le Mont Sélénite.`,
        `Il s'agit d'une des régions les plus anciennes de Kanto !`,
        `On dit qu'on peut y trouver de nombreux fossiles de Pokémon disparus.`,
        `Imagine si on pouvait leur redonner vie...`
    ],
    [AZURIA.ref]: [
        `Ce bateau, là, c'est l'Océane !`,
        `Il est beau, hein ?`,
        `Il va en croisière permanente entre Azuria, Carmin sur Mer et Cramois'Île.`,
        `Si tu veux monter dedans au bon moment, tu devrais mémoriser ce trajet !`
    ],
    [LAVANVILLE.ref]: [
        `Lavanville est une ville plutôt tranquille, coincée entre les montagnes...`,
        `Mais il y a quelques lieux d'intérêt, comme la Tour Pokémon ou la Centrale.`
    ],
    [SAFRANIA.ref]: [
        `J'ai laissé mon Pokémon à la Pension au nord pendant quelques jours.`,
        `Je l'ai retrouvé en pleine forme, plus fort que jamais !`,
        `L'éleveur de la Pension fait vraiment un travail remarquable.`
    ],
    [CELADOPOLE.ref]: [
        `La Colline Royale qui surplombe Céladopole est un endroit légendaire.`,
        `On raconte qu'on peut y croiser des Pokémons Dragon !`,
        `Mais le chemin est bloqué par un énorme Pokémon endormi...`,
        `Si seulement on trouvait un moyen de le réveiller...`
    ],
    [CARMIN.ref]: [
        `J'ai pris le raccourci de la Cave Taupiqueur pour venir ici plus vite.`,
        `Mais j'ai quand même raté le départ du bateau, alors j'attends ici...`
    ],
    [PARMANIE.ref]: [
        `Le Parc Safari est la grande attraction de Parmanie.`,
        `Il attire plein de dresseurs Pokémon de tout Kanto !`,
        `On y trouve une grande variété de Pokémon de tous types.`,
        `Mais les combats y sont interdits pour préserver leur tranquilité.`
    ],
    [CRAMOISILE.ref]: [
        `Je travaille au Laboratoire d'étude des Pokémon du Dr. Fuji.`,
        `J'étudie les fossiles rares de Pokémon.`,
        () => {
            const fossile = FOSSILES.find(item => gameState.player.inventory[item.ref] > 0)
            if(fossile && gameState.player.box.some(slot => slot === null)){
                return [
                    `Comment ? Tu as trouvé un fossile ?`,
                    `Montre-le moi, allez montre-le !`,
                    `...`,
                    `Incroyable ! Il est en parfait état !`,
                    `Je pourrais peut-être même... le ramener à la vie !`,
                    `Tu veux bien me le confier ?`,
                    {
                        "OUI": () => {
                            return [
                                `Excellent ! Je reviens vite !`,
                                () => {
                                    gameState.activeScene!.cameras.main.flash(1000,0,0,0)
                                    gameState.player.inventory[fossile.ref] -= 1
                                    const FOSSILE_MAPPING = {
                                        [FOSSILE_AMONITA.ref]: AMONITA,
                                        [FOSSILE_KABUTO.ref]: KABUTO,
                                        [FOSSILE_PTERA.ref]: PTERA
                                    }
                                    const pokemon = new Pokemon({
                                        entry: FOSSILE_MAPPING[fossile.ref]!,
                                        owner: OWNER_PLAYER, 
                                        level: 30
                                    })
                                    addToBox(pokemon)
                                    return [`!!!`, `Incroyable !`, 
                                        `C'est un ${pokemon.entry.name} ! Je les croyais disparus !`,
                                        `Hmm ? Quoi ?`,
                                        `Ah, oui, je suppose qu'il est à toi...`,
                                        () => {
                                            pauseMusicAndPlaySound("pokemon_received")
                                            return startDialog([`Vous recevez un ${pokemon.entry.name} ramené à la vie !`], { speaker: "system"})                                            
                                        },
                                        `Reviens me voir si tu trouves d'autres spécimens !`
                                    ]
                                }
                            ]
                        },
                        "NON": () => {
                            return [`Mais... mais... c'est pour la science !`]
                        }
                    }
                ]
            } else {
                return [
                    `J'ai conçu une machine de résurrection des fossiles Pokémon !`,
                    `Mais je n'ai pas encore de spécimens d'assez bonne qualité.`
                ]
            }
        }
    ],

    [LIGUE.ref]: [
        `Ah, alors tu veux des infos sur les Champions de la Ligue ?`,
        {
            "OUI": () => [
                `Pour prétendre au titre de maître de la Ligue Pokémon,`,
                `tu devras affronter les 4 membres du Conseil des 4 l'un après l'autre.`,
                `Tout d'abord tu affronteras Olga, la reine de la glace !`,
                `Débarasse-toi en rapidement avec que ton équipe soit transformée en glaçon.`,
                `Ensuite vient Aldo, spécialiste du combat et de la force brute.`,
                `Ses Pokémon sont costauds, il va falloir ruser pour le vaincre !`,
                `En troisième, la terrifiante Agatha et ses Pokémon Spectre !`,
                `Ils sèment la confusion dans ton équipe, alors peaufine ton placement.`,
                `Enfin tu affronteras Peter, maître des Dragons.`,
                `Les Dragons sont très tenaces. Il te faudra donner tout ce que tu as !`,
                `Voilà, je ne sais pas ce qu'il y a après. Je n'ai jamais pu aller plus loin !`
            ],
            "NON": () => [
                `Ah, je croyais que... non, laisse tomber.`
            ]
        }
    ]
    
}

export const HEALER = () => startDialog([
    `Les combats dans la Ligue sont très éprouvants pour tes Pokémon.`,
    `Mais nous prenons soin de soigner toute ton équipe entre chaque combat.`
], { speaker: "female2" })