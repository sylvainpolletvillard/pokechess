import {closeMenu, openMenu} from "./menu";
import GameScene from "../scenes/GameScene";
import {gameState} from "../logic/gamestate";
import {Item, ITEMS, ITEMS_SPRITES_INDEX, ItemType, ITEM_POKEBALL, REPOUSSE} from "../data/items";
import {hideItemDescription, showItemDescription} from "./itemDescriptionBox";
import { addInteractiveElem, handleDragStart, InteractiveElem, removeInteractiveElem, updateCursorHover } from "./cursor";
import { playSound } from "../logic/audio";
import { startDialog } from "../logic/dialog";
import { RoomType } from "../types/destination";
import { refreshWildPokemons } from "../logic/board";
import { wait } from "../utils/helpers";
import { Z } from "../data/depths";
import { addText } from "../utils/text";

interface ItemEntry {
    ref: string;
    label: string;
    quantity: number;
}

const list = {
    items: [] as ItemEntry[],
    selectedIndex: 0,
    pageStartIndex: 0,
    numberPerPage: 6,
    get page(){
        const startIndex = Math.max(0, list.pageStartIndex ?? 0)
        return this.items.slice(startIndex, startIndex + this.numberPerPage)
    },
    get selectedItem(){
        return this.items[this.selectedIndex ?? 0]
    },
    get pageSelectedIndex(){
        return this.page.indexOf(this.selectedItem)
    }
}

let menuContainer: Phaser.GameObjects.Container | null = null;
let interactiveElems: InteractiveElem[] = [];
let cursorSprite: Phaser.GameObjects.Sprite | null = null;

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
    const width = 128, height = 6 * rowHeight + 10
    let ox = 320 - width - 8;
    let oy = 8;
    list.items = Object.entries(gameState.player.inventory)
        .map(([itemRef, quantity],i) => ({ 
            ref: itemRef,
            label: `${ITEMS[itemRef]?.label} x${quantity}`,
            quantity
         }))
         .filter(item => item.quantity > 0 && item.ref in ITEMS)
         .sort((a,b) => {
            if(b.ref === ITEM_POKEBALL.ref) return +1
            if(a.ref === ITEM_POKEBALL.ref) return -1
            return a.label.localeCompare(b.label)
        })
    list.selectedIndex = 0;
    list.pageStartIndex = 0;

    playSound("menu_open")

    return openMenu({
        ref: "items_box",
        x: ox,
        y: oy,
        width,
        height,
        background: "box1",
        offset: 8,
        handleMove(moveVector){
            playSound("tick")
            if(moveVector.y > 0){
                selectInList(list.selectedIndex+1)
            } else if(moveVector.y < 0){
                selectInList(list.selectedIndex-1)
            }
        },
        handleChoice(){
            handleChoice(list.items[list.selectedIndex])
        },
        draw(container){
            list.selectedIndex = 0;
            menuContainer = game.add.container(ox,oy)
            container.add(menuContainer)
            selectInList(0, false)
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

function handleChoice(choice: ItemEntry){
    const game = gameState.activeScene as GameScene;
    const item = ITEMS[choice.ref] as Item;

    if(item.type === ItemType.Holdable){
        closeMenu()
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
        if(shouldCloseMenu) closeMenu()
    }
}

function selectInList(index: number, shouldMoveCursor = false){
    const scene = gameState.activeScene as GameScene
    if(index < 0 || index >= list.items.length) return;
    list.selectedIndex = index;
    if(index < list.pageStartIndex) list.pageStartIndex = index;
    else if(index > list.pageStartIndex + list.numberPerPage - 1) list.pageStartIndex = index - list.numberPerPage + 1;
    drawItemBox()

    const item = ITEMS[list.items[list.selectedIndex].ref]
    if(item) showItemDescription(item)
    else hideItemDescription()

    if(shouldMoveCursor){
        scene.sprites.get("cursor")?.setPosition(298, 20 + list.pageSelectedIndex*20)
    }
}

function drawItemBox(){
    const scene = gameState.activeScene as GameScene

    if(!menuContainer) return
    menuContainer.removeAll(true)

    interactiveElems.forEach(elm => removeInteractiveElem(elm))
    interactiveElems = []

    drawList()

    cursorSprite = scene.add.sprite(7, 16 + list.pageSelectedIndex*20, "gui", 16);
    cursorSprite.setScale(0.5).setDepth(Z.MENU_CURSOR)
    menuContainer.add(cursorSprite)

    menuContainer.setDepth(Z.MENU)
    updateCursorHover(scene)
}

function drawList(){
    const scene = gameState.activeScene as GameScene

    list.page.forEach((entry, i) => {
        const bg = scene.add.rectangle(64, 15+i*20, 118, 20, i%2 ? 0xffeedd : 0xeeddcc)
            .setDepth(Z.MENU_LAYOUT)
        addInteractiveElem(bg);
        interactiveElems.push(bg);
        bg.on("click", () => {
            let index = list.items.indexOf(entry)
            if(index === list.selectedIndex) handleChoice(list.items[index])
            else selectInList(index, false)
        })
        const color = ITEMS[entry.ref].type === ItemType.Trade ? "gray" : "black"
        const name = addText(16, 8+i*20, entry.label, { color })
            .setDepth(Z.MENU_OBJECTS)
            .setAlign("left")
        menuContainer?.add(bg)
        menuContainer?.add(name)
    })

    const bgArrowUp = scene.add.rectangle(64, 0, 90, 6, 0x000000)
        .setDepth(Z.MENU_LAYOUT).setAlpha(0)
    addInteractiveElem(bgArrowUp);
    interactiveElems.push(bgArrowUp);
    bgArrowUp.on("click", () => { selectInList(list.selectedIndex-1, false) })
    const arrowUp = scene.add.sprite(64, 0, "gui", 16)
        .setScale(0.5).setAlpha(list.pageStartIndex === 0 ? 0 : 1)
        .setRotation(Phaser.Math.DegToRad(-90))

    menuContainer?.add(bgArrowUp)
    menuContainer?.add(arrowUp)

    const bgArrowDown = scene.add.rectangle(64, 130, 90, 6, 0x000000)
        .setDepth(Z.MENU_LAYOUT).setAlpha(0)
    addInteractiveElem(bgArrowDown);
    interactiveElems.push(bgArrowDown);
    bgArrowDown.on("click", () => { selectInList(list.selectedIndex+1, false) })
    const arrowDown = scene.add.sprite(64, 130, "gui", 16)
        .setScale(0.5).setAlpha(list.pageStartIndex + list.numberPerPage >= list.items.length ? 0 : 1)
        .setRotation(Phaser.Math.DegToRad(+90))
        menuContainer?.add(bgArrowDown)
        menuContainer?.add(arrowDown)
}