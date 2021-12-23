import {Item, ITEMS_SPRITES_INDEX} from "../data/items";
import {gameState} from "../logic/gamestate";
import {MyScene} from "../scenes/MyScene";
import {addText} from "../utils/text";
import {Z} from "../data/depths";

let itemDescriptionGroup: Phaser.GameObjects.Group | null;

export function showItemDescription(item: Item){
    if(itemDescriptionGroup) hideItemDescription()
    if(!item) return;

    const scene = gameState.activeScene as MyScene
    itemDescriptionGroup= scene.add.group().setOrigin(0,0)

    const height = 64
    const ox = 24;
    const oy = scene.scale.height - height - 32

    const background = scene.add.nineslice(
        ox, oy,   // this is the starting x/y location
        scene.scale.width - 32, height,   // the width and height of your object
        "box1", // a key to an already loaded image
        8,   // the width and height to offset for a corner slice
    ).setScrollFactor(0);

    itemDescriptionGroup.add(background)

    const itemSprite = gameState.activeScene!.add.sprite(ox+78, oy + 96, "items", ITEMS_SPRITES_INDEX.indexOf(item)).setOrigin(0.5, 0.5)
    itemDescriptionGroup.add(itemSprite)
    if(gameState.activeScene?.scene.key === "GameScene"){
        itemSprite.x -= 48;
        itemSprite.y -= 64;
    }

    itemDescriptionGroup.add(addText(ox+ 56, oy + 8, item.label, {
        fontStyle: "strong",
        color: "blue"
    }))
    itemDescriptionGroup.add(addText(ox + 56, oy + 28, item.desc, {
        wordWrap: {
            width: scene.scale.width - 96,
            useAdvancedWrap: true
        }
    }))
    itemDescriptionGroup.setDepth(Z.MENU)
}

export function hideItemDescription(){
    if(itemDescriptionGroup){
        itemDescriptionGroup.destroy(true)
        itemDescriptionGroup = null;
    }
}