import { MenuEntry, openMenu} from "./menu";
import {gameState} from "../logic/gamestate";
import {Item, ITEMS} from "../data/items";
import {wait} from "../utils/helpers";
import {addText} from "../utils/text";
import {drawPokeballsCounter} from "./gui";
import RoomScene from "../scenes/RoomScene";
import {getShopContent, spend} from "../logic/shop";
import {endDialog, startDialog, waitBeforeNextLine} from "../logic/dialog";
import {receiveItem} from "../data/dialogs/descriptions";
import {hideItemDescription, showItemDescription} from "./itemDescriptionBox";

// veut-on pouvoir vendre les objets ????
export function openShop(seller: string){
    let ox = 320 - 64 - 8;
    let oy = 8;
    return openMenu({
        ref: "shop_buy_or_sell",
        x: ox,
        y: oy,
        width: 64,
        height: 70,
        background: "box1",
        offset: 8,
        entries: ["Acheter","Vendre","Quitter"].map((label,i) => ({
            x: 4,
            y: 4+i*20,
            label,
            value: label
        })),
        handleChoice(choice){
            if(choice.label === "Acheter") return openBuyMenu(seller)
            else if(choice.label === "Vendre") return openSellMenu(seller)
        },
        handleCancel(){

        },
    })
}


export function openBuyMenu(seller: string){
    drawPokeballsCounter(gameState.activeScene as RoomScene)
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
    return openMenu({
        ref: "shop_buy",
        x: ox,
        y: oy,
        width,
        height,
        background: "box1",
        offset: 8,
        entries,
        draw(group){
            entries.forEach((entry, i) => {
                if(!entry.value) return
                const item = ITEMS[entry.value]
                const pokeball = group.scene.add.sprite(330, 87+i*rowHeight, "pokeball", 0).play("POKEBALL_idle")
                const cost = addText(320-28, 17+i*rowHeight, "x"+item.cost)
                group.add(pokeball)
                group.add(cost)
            })
        },
        async handleChoice(choice){
            hideItemDescription();

            if(!choice.value) return; // Quitter

            const item = ITEMS[choice.value] as Item;
            if(!item.cost) return;

            waitBeforeNextLine(1600)
            startDialog([
                `1 ${item.label} pour ${item.cost} ball${item.cost > 1 ? 's' : ''}, c'est ça ?`
            ], { speaker: seller }).then(() => {})

            await wait(1500);

            openMenu({
                ref: "shop_confirm",
                background: "box2",
                x: 265,
                y: 240,
                width: 48,
                height: 48,
                offset: 4,
                entries: [
                    { x:4, y: 4, label: "Oui" },
                    { x:4, y: 24, label: "Non" }
                ],
                handleChoice(choice){
                    endDialog();
                    if(choice.label === "Oui"){
                        spend(item.cost!)
                        return receiveItem(item, 1)
                            .then(() => openBuyMenu(seller))
                    } else {
                        return wait(100).then(() => openBuyMenu(seller))
                    }
                }
            })
        },
        handleCancel(){
            hideItemDescription();
        },
        onSelect(entry){
            const item = ITEMS[entry.value]
            if(item) showItemDescription(item)
            else hideItemDescription()
        }
    })
}


export function openSellMenu(seller: string){
    const width = 144, height = 6 * 20 + 16
    let ox = 320 - width - 8;
    let oy = 8;
    const items = gameState.player.inventory ?? {};
    const entries: MenuEntry[] = Object.entries(items).map(([itemRef, quantity],i) => ({
        x: 4,
        y: 4+i*20,
        label: `${ITEMS[itemRef].label} x${quantity}`,
        value: itemRef
    }))
    entries.push({
        x:4,
        y: 4+entries.length*20,
        label: "Quitter",
    })
    return openMenu({
        ref: "shop_sell",
        x: ox,
        y: oy,
        width,
        height,
        background: "box1",
        offset: 8,
        entries,
        draw(group){
            entries.forEach((entry, i) => {
                if(!entry.value) return;
                const item = ITEMS[entry.value]
                const pokeball = group.scene.add.sprite(330, 86+i*20, "pokeball", 0).play("POKEBALL_idle")
                const cost = addText(320-28, 16+i*20, "x"+item.cost)
                group.add(pokeball)
                group.add(cost)
            })
        },
        handleChoice(choice){

        },
        handleCancel(){

        },
    })
}