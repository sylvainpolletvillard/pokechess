import Phaser from "phaser";
import {BOARD_HEIGHT, BOARD_WIDTH, getCoordsFromPosition, getPositionFromCoords} from "../logic/board";
import {GameStage, gameState} from "../logic/gamestate";
import {Z} from "../data/depths";
import {MyScene} from "../scenes/MyScene";
import {showNextLine} from "../logic/dialog";

export type InteractiveElem = Phaser.GameObjects.Sprite | Phaser.GameObjects.Zone | Phaser.GameObjects.Rectangle | Phaser.GameObjects.Text
const interactiveElems: Set<InteractiveElem> = new Set();
let hoveredElems: InteractiveElem[] = [];

export interface DragState {
    draggedElem: Phaser.GameObjects.Sprite | null
}

export const dragState: DragState = { draggedElem: null }

export function drawCursor(scene: MyScene){
    const [x, y] = getPositionFromCoords(1,6)
    const cursor = scene.add.sprite(x,y, "cursor")
    cursor.setDepth(Z.CURSOR);
    cursor.setOrigin(0, 0)
    cursor.play("cursor_point")
    scene.sprites.set("cursor", cursor)
}

export function moveCursor(vector: Phaser.Math.Vector2, scene: MyScene, snapToGrid: boolean = false){
    const cursor = scene.sprites.get("cursor")
    if(cursor != null){
        let x = cursor.x, y= cursor.y;
        if(snapToGrid){
            const [row,col] = getCoordsFromPosition(cursor.x + 18, cursor.y + 18);
            [x, y] = getPositionFromCoords(row,col)
        }
        x += vector.x;
        y += vector.y;
        cursor.x = Phaser.Math.Clamp(x, 0, scene.scale.width-10)
        cursor.y = Phaser.Math.Clamp(y, 0, scene.scale.height-10)
        updateCursorHover(scene)
        handleDragMove(scene)
    }
}

export function handleClick(scene: MyScene){
    if(gameState.activeDialog != null){
        return showNextLine()
    }

    if(dragState.draggedElem === null){
        const cursor = scene.sprites.get("cursor")
        cursor?.play("cursor_click")
    }

    hoveredElems
        .filter(e => e!== dragState.draggedElem)
        .forEach(e => e.emit('click'))
}

export function updateCursorHover(game: MyScene){
    const cursor = game.sprites.get("cursor")
    if(!cursor || !interactiveElems) return;
    const newHoveredElems = [...interactiveElems]
        .filter(elem => elem.getBounds().contains(cursor.x+6, cursor.y+6))
        .sort((a,b) => {
            if(a instanceof Phaser.GameObjects.Zone) return +1
            if(b instanceof Phaser.GameObjects.Zone) return -1
            return a.depth - b.depth
        })

    hoveredElems.filter(e => !newHoveredElems.includes(e)).forEach(e => e.emit('out'))
    newHoveredElems.filter(e => !hoveredElems.includes(e)).forEach(e => e.emit('over'))
    hoveredElems = newHoveredElems

    /*newHoveredElems.forEach(e => {
        if(e instanceof Phaser.GameObjects.Zone){
            game.add.rectangle(e.x, e.y, e.width, e.height, 0xff0000, 0.01)
        } else {
            e.setTint(0xff0000)
        }
    })*/
}

export function addInteractiveElem(elem: InteractiveElem){
    interactiveElems.add(elem)
}

export function removeInteractiveElem(elem: InteractiveElem){
    interactiveElems.delete(elem)
}

export function handleDragStart(gameObject: Phaser.GameObjects.Sprite, scene: MyScene) {
    const cursor = scene.sprites.get('cursor');
    if(cursor == null) return;
    cursor.play("cursor_drag");
    gameObject.x = cursor.x
    gameObject.y = cursor.y + 16
    gameObject.setDepth(Z.SPRITE_DRAGGED)
    dragState.draggedElem = gameObject;
    gameObject.emit("dragstart")
}

export function handleDragEnd(scene: MyScene){
    const dropZones = hoveredElems.filter(elm => testIfCanBeDroppedOn(elm))
    if(dropZones.length === 0) return;
    const cursor = scene.sprites.get('cursor');
    if(cursor == null) return;
    cursor.play("cursor_drop")
    if(dragState.draggedElem != null){
        dragState.draggedElem?.setDepth(Z.POKEMON).emit('drop', cursor)
        dropZones.forEach(elm => elm.emit('dropReceived', dragState.draggedElem))
        dragState.draggedElem = null;
    }
}

export function handleDragMove(scene: MyScene){
    const cursor = scene.sprites.get('cursor');
    if(!dragState.draggedElem || !cursor) return;
    dragState.draggedElem.x = cursor.x;
    dragState.draggedElem.y = cursor.y+16;
}

export function testIfCanBeDragged(sprite: Phaser.GameObjects.Sprite){
    if(sprite.getData("pokemon") != null){
        return sprite.getData("pokemon").owner === 1 && gameState.stage === GameStage.PLACEMENT
    }
    return true;
}

export function testIfCanBeDroppedOn(elem: InteractiveElem){
    if(gameState.stage !== GameStage.PLACEMENT) return false;
    const dropZoneType = elem.getData("type");
    const draggedType = dragState.draggedElem?.getData("type")

    switch(dropZoneType){
        case "gridTile":            
            const [x,y] = elem.getData("position")
            return draggedType === "pokemon"
                && x >= 0
                && x < BOARD_WIDTH
                && y >= BOARD_HEIGHT/2
                && y < BOARD_HEIGHT
        case "boxTile":
        case "pokedexButton":
        case "boxButton":
            return draggedType === "pokemon"
        case "bagButton":
            return draggedType === "pokemon" || draggedType === "item"
    }

    return false;
}