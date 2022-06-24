
import {startDialog, waitBeforeNextLine} from "../../logic/dialog";
import {splitInGroups, wait} from "../../utils/helpers";
import {pickStarter} from "../../logic/starters";
import {Description} from "../../objects/description";
import {pauseMusicAndPlaySound} from "../../logic/audio";
import {gameState} from "../../logic/gamestate";
import {Item, ITEM_POKEBALL} from "../items";
import {DialogLine} from "../../types/dialog";
import { drawPokeballsCounter } from "../../objects/pokeballsCounter";
import { loadRecord, saveNewRecord } from "../../logic/save";
import { fadeOut } from "../../utils/camera";
import { getNonLegendaryPokemons, PokemonEntry } from "../pokemons";

export function receiveItem(item: Item, quantity: number = 1, shouldPlaySound = true, source="trainer"): Promise<void>{
    shouldPlaySound && pauseMusicAndPlaySound("item_received")
    if(!gameState.player.inventory.hasOwnProperty(item.ref)){
        gameState.player.inventory[item.ref] = 0;
    }
    gameState.player.inventory[item.ref] += quantity;
    const label = item.label ?? "???"
    if(item === ITEM_POKEBALL) drawPokeballsCounter()
    waitBeforeNextLine(2000)
    return startDialog([`Vous ${source==="finding"? "trouvez" : "recevez"}: ${label} ${quantity > 1 ? 'x'+quantity : ''}`], { speaker: "system"})
}

let bookIndex = 0;

export const DESCRIPTIONS: { [name: string]: DialogLine[] | ((d: Description) => DialogLine[]) } = {
    unknown: [`..?`],
    tv: [`La TV diffuse les actualités du jour...`,
        `FLASH SPECIAL !`,
        () => [
            `On aurait aperçu un Elekthor à la centrale !`,
            `Un Artikodin a été vu aux Îles Ecume !`,
            `Le Mont Braise serait le repère d'un Sulfura !`,
        ][(++bookIndex) % 3],
        `Nos journalistes tâchent d'en savoir plus.`],
    frigo: [
        `MAM: Tu as encore faim ? Un vrai estomac sur pattes !`
    ],
    book: [
        `C'est mon cahier de cours d'études des Pokémon`,
        () => {
            const conseils = [
                `Les Pokémon normaux sont polyvalents, mais se font battre par les spécialistes du Combat.`,
                `Les Pokémon de type Roche n'aiment pas l'eau.`,
                `Les Pokémon aquatiques craignent l'électricité.`,
                `Les Pokémon de type Feu sont impuissants face à l'eau.`,
                `Le feu est mortel pour les pokémon Plante.`,
                `Les Pokémon Vol craignent la foudre.`,
                `Les Pokémon électriques sont neutralisés par la Terre.`,
                `Les Pokémon Glace sont brisés par la Roche.`,
                `Les Pokémon Combat ont une faiblesse: les attaques Psy.`,
                `Les Pokémon Sol résistent bien au Poison.`,
                `Les Pokémon Plante gagnent contre les Pokémon Sol au long terme.`,
                `Les Pokémon Psy ont étrangement peur des Insectes.`,
                `Les Pokémon Insecte se font picorer par les oiseaux.`,
                `Seul un Spectre peut vraiment faire face à un autre Spectre.`,
                `Les Dragons peuvent être piégés par la Glace.`
            ]
            return conseils[(++bookIndex) % conseils.length]
        }
    ],
    book_insect: [
        `C'est un cahier de notes sur les évolutions des Pokémon.`,
        () => {
            let pokemons = gameState.player.boardAndBox.map(p => p.entry).filter(p => p.evolution != null)
            if(pokemons.length === 0) pokemons = getNonLegendaryPokemons().filter(p => p.evolution != null)
            let pokemon: PokemonEntry = pokemons[bookIndex % pokemons.length]
            bookIndex++
            return `Il est écrit que ${pokemon.name} évolue au niveau ${pokemon.evolutionLevel}`
        },
        `Intéressant. Je devrais garder ça en mémoire !`
    ],
    map: [
        `C'est la carte de la région de Kanto.`
    ],
    bed: [
        `Ce n'est pas le moment d'aller dormir !`
    ],
    boat: [
        `C'est une maquette de l'Océane, le célèbre bateau de croisière.`
    ],

    starter1: pickStarter(0),
    starter2: pickStarter(1),
    starter3: pickStarter(2),

    pc_end: [
        "Enregistrer l'équipe dans le livre des records ?",
        {
            "OUI": () => ["Enregistrement...", () => {
                saveNewRecord()
                wait(2000)
                    .then(() => fadeOut(2000))
                    .then(() => { gameState.activeScene!.scene.start("GameOverScene") })
                return `Félicitations ! Vous et vos Pokémon êtes célèbres !`
            }],
            "NON": () => {
                return [`... Fin de session.`]
            }
        }
    ],

    pc_record: [
        `Bzzz... Ouverture du livre des records...`,
        () => {
            const record = loadRecord()
            if(!record) return "Aucune donnée disponible."            
            return [
                `Dernier maître de la ligue recensé:\nMaître en ${record.nbTours} tours`,
                `${record.pokedexCaptured} Pokémon capturés\n${record.pokedexSeen} Pokémon observés`,
                `Equipe de prédilection:`,
                ...splitInGroups(record.team.map(p => `${p.entry.name} lvl ${p.level}`), 2).map((pair: string[]) => `${pair[0]}\n${pair[1]}`)
            ]
        },
        `Bzzz.. L'écran s'est éteint...`,
    ]

}