import {MenuEntry, openMenu} from "./menu";
import Game from "../scenes/GameScene";
import {gameState} from "../logic/gamestate";
import {Item, ITEMS} from "../data/items";
import {hideItemDescription, showItemDescription} from "./itemDescriptionBox";

export function openItemMenu(game: Game){

    const rowHeight = 20
    const width = 104, height = 6 * rowHeight + 8
    let ox = 320 - width - 8;
    let oy = 8;
    const items = gameState.player.inventory
    const entries: MenuEntry[] = Object.entries(items).map(([itemRef, quantity],i) => ({
        x: 4,
        y: 4+i*rowHeight,
        label: `${ITEMS[itemRef].label} x${quantity}`,
        value: itemRef
    }))

    return openMenu({
        ref: "items_box",
        x: ox,
        y: oy,
        width,
        height,
        background: "box1",
        offset: 8,
        entries,
        draw(group){

        },
        async handleChoice(choice){
            hideItemDescription();

            const item = ITEMS[choice.value] as Item;
            console.log({ item })
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