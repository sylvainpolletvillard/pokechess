import { closeMenu, MenuEntry, openMenu} from "./menu";
import {gameState} from "../logic/gamestate";
import {Item, ITEMS} from "../data/items";
import {wait} from "../utils/helpers";
import {addText} from "../utils/text";
import {drawPokeballsCounter} from "./pokeballsCounter";
import {canAfford, getShopContent, spend} from "../logic/shop";
import {endDialog, startDialog, waitBeforeNextLine} from "../logic/dialog";
import {receiveItem} from "../data/dialogs/descriptions";
import {hideItemDescription, showItemDescription} from "./itemDescriptionBox";
import { playSound } from "../logic/audio";

export function openBuyMenu(seller: string){
    if(!gameState.currentDestination.shopId) return console.error(`Missing shopId`)
    drawPokeballsCounter()
    const rowHeight = 20
    const width = 144, height = 6 * rowHeight + 8
    let ox = 320 - width - 8;
    let oy = 8;
    const items = getShopContent(gameState.currentDestination.shopId);
    const entries: MenuEntry[] = Object.entries(items).map(([itemRef, quantity],i) => ({
        x: 4,
        y: 4+i*rowHeight,
        label: `${ITEMS[itemRef].label}`,
        value: itemRef
    }))
    entries.push({
        x:4,
        y: 4+entries.length*rowHeight,
        label: "Quitter"
    })

    playSound("menu_open")
    return openMenu({
        ref: "shop_buy",
        x: ox,
        y: oy,
        width,
        height,
        background: "box1",
        offset: 8,
        entries,
        draw(container){
            entries.forEach((entry, i) => {
                if(!entry.value) return
                const item = ITEMS[entry.value]
                const pokeball = container.scene.add.sprite(ox+114, oy+15+i*rowHeight, "pokeball", 0).play("POKEBALL_idle").setScrollFactor(0)
                const cost = addText(320-28, 17+i*rowHeight, "x"+item.cost, { color: canAfford(item.cost!) ? "black":  "red" })
                container.add(pokeball)
                container.add(cost)
            })
        },
        handleChoice(choice){
            hideItemDescription();

            if(!choice.value) return; // Quitter

            const item = ITEMS[choice.value] as Item;
            if(!item.cost) return;

            waitBeforeNextLine(1600)
            startDialog([
                `1 ${item.label} pour ${item.cost} ball${item.cost > 1 ? 's' : ''}, c'est ça ?`,
                {
                    "Oui": () => {
                        if(!canAfford(item.cost!)) return "Tu n'as pas assez de Pokéballs, gamin !"
                        endDialog();
                        spend(item.cost!)                        
                        return receiveItem(item, 1, true, "shop")
                            .then(() => { openBuyMenu(seller) })
                    },
                    "Non": () => wait(100).then(() => {
                        endDialog();
                        openBuyMenu(seller)
                    })
                }
            ], { speaker: seller })
        },
        handleCancel(){
            hideItemDescription();
            closeMenu()
        },
        onSelect(entry){
            const item = ITEMS[entry.value]
            if(item) showItemDescription(item)
            else hideItemDescription()
        }
    })
}