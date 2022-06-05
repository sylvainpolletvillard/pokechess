
import {startDialog, waitBeforeNextLine} from "../../logic/dialog";
import {pickRandomIn, wait} from "../../utils/helpers";
import {pickStarter} from "../../logic/starters";
import {Description} from "../../objects/description";
import {pauseMusicAndPlaySound} from "../../logic/audio";
import {gameState} from "../../logic/gamestate";
import {Item, ITEMS, ITEM_POKEBALL} from "../items";
import {DialogLine} from "../../types/dialog";
import { drawPokeballsCounter } from "../../objects/pokeballsCounter";
import { saveNewRecord } from "../../logic/save";
import { fadeOut } from "../../utils/camera";

export function receiveItem(item: Item, quantity: number = 1, shouldPlaySound = true): Promise<void>{
    shouldPlaySound && pauseMusicAndPlaySound("item_received")
    if(!gameState.player.inventory.hasOwnProperty(item.ref)){
        gameState.player.inventory[item.ref] = 0;
    }
    gameState.player.inventory[item.ref] += quantity;
    const label = ITEMS[item.ref]?.label ?? "???"
    if(item === ITEM_POKEBALL) drawPokeballsCounter()
    waitBeforeNextLine(2000)
    return startDialog([`Vous recevez: ${label} x${quantity}`], { speaker: "system"})
}

export const DESCRIPTIONS: { [name: string]: DialogLine[] | ((d: Description) => DialogLine[]) } = {
    unknown: [`..?`],
    tv: [`La TV diffuse les actualités du jour...`,
        `FLASH SPECIAL !`,
        () => pickRandomIn([
            `On aurait aperçu un Elekthor à la centrale !`,
            `Un Artikodin a été vu aux Îles Ecume !`,
            `Le Mont Braise serait le repère d'un Sulfura !`,
        ]),
        `Nos journalistes tâchent d'en savoir plus.`],
    frigo: [
        `MAM: Tu as encore faim ? Un vrai estomac sur pattes !`
    ],
    book: [
        `C'est mon cahier de cours d'études des Pokémon`,
        () => pickRandomIn([
            `Les Pokémon de type Roche n'aiment pas l'eau`,
            `Les Pokémon aquatiques craignent l'électricité`,
            `Les Pokemon de type Feu n'aiment pas l'eau`,
            `Le feu est mortel pour les pokémon Plante`,
            `Les Pokémon Vol craignent la foudre`,
        ])
    ],
    map: [
        `C'est la carte de la région de Kanto`
    ],
    bed: [
        `Ce n'est pas le moment d'aller dormir !`
    ],

    starter1: pickStarter(0),
    starter2: pickStarter(1),
    starter3: pickStarter(2),

    pc_end: [
        "Enregistrer l'équipe dans le livre des records ?",
        {
            "Oui": () => ["Enregistrement...", () => {
                saveNewRecord()
                wait(2000)
                    .then(() => fadeOut(2000))
                    .then(() => { gameState.activeScene!.scene.start("GameOverScene") })
                return `Félicitations ! Vous et vos Pokémon êtes célèbres !`
            }],
            "Non": () => {
                return [`... Fin de session.`]
            }
        }
    ]

}