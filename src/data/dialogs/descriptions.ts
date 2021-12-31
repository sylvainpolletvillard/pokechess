import {DialogLine, startDialog} from "../../logic/dialog";
import {pickRandomIn} from "../../utils/helpers";
import {pickStarter} from "../../logic/starters";
import {Description} from "../../objects/description";
import {pauseMusicAndPlaySound} from "../../logic/audio";
import {gameState} from "../../logic/gamestate";
import {Item, ITEMS} from "../items";

export function receiveItem(item: Item, quantity: number = 1){
    pauseMusicAndPlaySound("item_received").then(() => {})
    if(!gameState.player.inventory.hasOwnProperty(item.ref)){
        gameState.player.inventory[item.ref] = 0;
    }
    gameState.player.inventory[item.ref] += quantity;
    const label = ITEMS[item.ref]?.label ?? "???"
    return startDialog([`Vous recevez: ${label} x${quantity}`], { wait: 2000 })
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

}