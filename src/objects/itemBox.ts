import {closeMenu, MenuEntry, openMenu} from "./menu";
import GameScene from "../scenes/GameScene";
import {gameState} from "../logic/gamestate";
import {Item, ITEMS, ITEMS_SPRITES_INDEX, ItemType, ITEM_POKEBALL, REPOUSSE} from "../data/items";
import {hideItemDescription, showItemDescription} from "./itemDescriptionBox";
import { handleDragStart } from "./cursor";
import { playSound } from "../logic/audio";
import { startDialog } from "../logic/dialog";
import { RoomType } from "../types/destination";
import { refreshWildPokemons } from "../logic/board";
import { wait } from "../utils/helpers";

export function makeItemSprite(item: Item){
    const sprite = gameState.activeScene!.add.sprite(0, 0, "items",
        ITEMS_SPRITES_INDEX.indexOf(item)
    ).setOrigin(0.5, 0.5)
    sprite.setData("item", item)
    sprite.setData("type", "item")
    return sprite
}

export function openItemMenu(game: GameScene){
    const rowHeight = 20
    const width = 128, height = 6 * rowHeight + 8
    let ox = 320 - width - 8;
    let oy = 8;
    const items = Object.entries(gameState.player.inventory)
        .map(([itemRef, quantity],i) => ({ 
            ref: itemRef,
            label: `${ITEMS[itemRef]?.label} x${quantity}`,
            quantity
         }))
         .filter(item => item.quantity > 0 && item.ref in ITEMS)
         .sort((a,b) => {
            if(b.ref === ITEM_POKEBALL.ref) return -1
            if(a.ref === ITEM_POKEBALL.ref) return +1
            return a.label.localeCompare(b.label)
        })

    const entries: MenuEntry[] = items.map((item,i) => ({
        x: 4,
        y: 4+i*rowHeight,
        color: ITEMS[item.ref].type === ItemType.Trade ? "gray" : "black",
        label: item.label,
        value: item.ref
    }))

    playSound("menu_open")

    return openMenu({
        ref: "items_box",
        x: ox,
        y: oy,
        width,
        height,
        background: "box1",
        offset: 8,
        entries,
        handleChoice(choice){
            const item = ITEMS[choice.value] as Item;

            if(item.type === ItemType.Holdable){
                const itemSprite = makeItemSprite(item)
                handleDragStart(itemSprite, game)
            } 
            else if(item.type === ItemType.Usable){
                wait(0).then(() => startDialog([`Utiliser ${item.label} ?`, {
                    "OUI"(){ useItem(item, game); },
                    "NON"(){ }
                }]))
                return true
            }
            else if(item.type === ItemType.Trade){
                const shouldCloseMenu = (item === ITEM_POKEBALL)
                return shouldCloseMenu
            }
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

function useItem(item: Item, game: GameScene){
    if(item === REPOUSSE){
        if(gameState.currentRoom.type !== RoomType.WILD) return startDialog(["Ça ne marchera pas ici..."])        
        gameState.player.inventory[REPOUSSE.ref] -= 1
        refreshWildPokemons(game)
    }
}