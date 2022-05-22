import {gameState} from "./gamestate";
import {drawPokeballsCounter} from "../objects/pokeballsCounter";
import {ITEMS} from "../data/items";

export function spend(amount: number){
    gameState.player.inventory.pokeball -= amount
    drawPokeballsCounter()    
}

export function canAfford(amount: number): boolean {
    return gameState.player.inventory.pokeball >= amount
}

export function getItemsByCost(n: number){
    return Object.values(ITEMS).filter(item => item.cost === n)
}

export function getShopContent(shopId: number): { [itemRef: string]: number } {
    const itemsT1 = getItemsByCost(1)
    const itemT1 = itemsT1[(gameState.seed + shopId) % itemsT1.length]

    const itemsT2 = getItemsByCost(2)
    const itemT2 = itemsT2[(gameState.seed >> 2 + shopId) % itemsT2.length]

    const itemsT3 = getItemsByCost(3)
    const itemT3 = itemsT3[(gameState.seed >> 4 + shopId) % itemsT3.length]

    const itemsT4 = getItemsByCost(4)
    const itemT4 = itemsT4[(gameState.seed >> 6 + shopId) % itemsT4.length]

    const itemsT5 = getItemsByCost(5)
    const itemT5 = itemsT5[(gameState.seed >> 8 + shopId) % itemsT5.length]

    return {
        [itemT1.ref]: 3,
        [itemT2.ref]: 2,
        [itemT3.ref]: 1,
        [itemT4.ref]: 1,
        [itemT5.ref]: 1,
    }
}