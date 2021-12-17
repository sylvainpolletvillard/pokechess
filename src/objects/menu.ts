import {addText} from "../utils/text";
import {Z} from "../data/depths";
import {gameState} from "../logic/gamestate";
import {MyScene} from "../scenes/MyScene";

let menuCursorPos: number = 0;
let cursorSprite: Phaser.GameObjects.Sprite | null = null;

export interface MenuEntry {
    label: string;
    value?: any;
    x: number;
    y: number;
}

export interface Menu {
    ref: string;
    x: number;
    y: number;
    width: number;
    height: number;
    background?: string;
    offset ?: number;
    entries?: MenuEntry[];
    draw?: (menuGroup: Phaser.GameObjects.Group) => any;
    handleMove?: (moveVector: Phaser.Math.Vector2) => any;
    handleCancel?: () => any;
    handleChoice?: (selectedEntry: MenuEntry) => any;
    onSelect?: (selectedEntry: MenuEntry) => any;
    group?: Phaser.GameObjects.Group
}

export function selectEntry(index: number){
    if(gameState.activeMenu === null || !gameState.activeMenu.entries) return
    menuCursorPos = (index + gameState.activeMenu.entries.length) % gameState.activeMenu.entries.length;
    cursorSprite?.setPosition(
        gameState.activeMenu.x+gameState.activeMenu.entries[menuCursorPos].x + 2,
        gameState.activeMenu.y+gameState.activeMenu.entries[menuCursorPos].y + 12
    );
    if(gameState.activeMenu.onSelect){
        gameState.activeMenu.onSelect(gameState.activeMenu.entries[menuCursorPos])
    }
}

export function getSelectedMenuEntry(): MenuEntry | null {
    if(!gameState.activeMenu?.entries) return null
    return gameState.activeMenu.entries[menuCursorPos]
}

export function chooseEntry(){
    if(!gameState.activeMenu?.entries) return false;
    const selectedEntry = gameState.activeMenu.entries[menuCursorPos]
    const menuToBeClosed = gameState.activeMenu
    closeMenu()
    menuToBeClosed.handleChoice!(selectedEntry);
    return true;
}

export function openMenu(menu: Menu){
    menu = Object.assign({
        handleMove: defaultHandleMove,
        handleCancel: () => closeMenu(),
        background: 'box2',
        offset: 4
    }, menu)

    const scene = gameState.activeScene as MyScene
    //game.sprites.get("cursor")?.setVisible(false)
    gameState.activeMenu = menu;
    menu.group = scene.add.group().setOrigin(0,0)

    const menuBackground = scene.add.nineslice(
        menu.x, menu.y,   // this is the starting x/y location
        menu.width, menu.height,   // the width and height of your object
        menu.background!, // a key to an already loaded image
        menu.offset!,   // the width and height to offset for a corner slice
    ).setScrollFactor(0);

    menu.group.add(menuBackground)
    if(menu.draw) menu.draw(menu.group)

    if(menu.entries != null){
        menuCursorPos = 0;
        cursorSprite = scene.add.sprite(
            menu.x+menu.entries[menuCursorPos].x+2,
            menu.y+menu.entries[menuCursorPos].y+12,
            "gui",
            16
        );
        scene.sprites.set("menuCursor", cursorSprite)
        cursorSprite.setScrollFactor(0).setScale(0.5)
        menu.group.add(cursorSprite)

        menu.entries.forEach((entry, i) => {
            const menuAction = addText(menu.x+8+entry.x, menu.y+4+entry.y, entry.label)
            menuAction.setInteractive()
            menuAction.on("pointerover", () => selectEntry(i))
            menu.group!.add(menuAction)
        })

        if(menu.onSelect){
            menu.onSelect(menu.entries[0])
        }
    }

    menu.group.setDepth(Z.MENU);
    return menu
}

export function closeMenu(){
    if(!gameState.activeMenu || !gameState.activeMenu.group) return
    gameState.activeMenu.group.destroy(true)
    gameState.activeMenu = null;
}

function defaultHandleMove(moveVector: Phaser.Math.Vector2){
    if(moveVector.y > 0){
        selectEntry(menuCursorPos+1)
    } else if(moveVector.y < 0) {
        selectEntry(menuCursorPos - 1)
    }
}