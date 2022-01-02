import {MenuEntry, openMenu} from "./menu";
import Game from "../scenes/GameScene";
import {gameState} from "../logic/gamestate";
import {Item, ITEMS, ITEMS_SPRITES_INDEX, ITEM_POKEBALL} from "../data/items";
import {hideItemDescription, showItemDescription} from "./itemDescriptionBox";
import { handleDragStart } from "./cursor";

export function makeItemSprite(item: Item){
    const sprite = gameState.activeScene!.add.sprite(0, 0, "items",
        ITEMS_SPRITES_INDEX.indexOf(item)
    ).setOrigin(0.5, 0.5)
    sprite.setData("item", item)
    sprite.setData("type", "item")
    return sprite
}

export function openItemMenu(game: Game){
    const rowHeight = 20
    const width = 104, height = 6 * rowHeight + 8
    let ox = 320 - width - 8;
    let oy = 8;
    const items = Object.entries(gameState.player.inventory)
        .map(([itemRef, quantity],i) => ({ 
            ref: itemRef,
            label: `${ITEMS[itemRef].label} x${quantity}`,
            quantity
         }))
         .sort((a,b) => {
            if(b.ref === ITEM_POKEBALL.ref) return -1
            if(a.ref === ITEM_POKEBALL.ref) return +1
            return a.label.localeCompare(b.label)
        })

    const entries: MenuEntry[] = items.map((item,i) => ({
        x: 4,
        y: 4+i*rowHeight,
        color: item.ref === ITEM_POKEBALL.ref ? "gray" : "black",
        label: item.label,
        value: item.ref
    }))

    console.log(entries)

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
            const itemSprite = makeItemSprite(item)

            handleDragStart(itemSprite, game)
        },
        handleCancel(){
            hideItemDescription();
        },
        onSelect(entry){
            const item = ITEMS[entry.value]
            if(item) showItemDescription(item)
            else hideItemDescription()
        },
        onClose(){
            hideItemDescription()
        }
    })
}