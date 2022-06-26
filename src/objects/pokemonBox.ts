import {openMenu} from "./menu";
import {
    addInteractiveElem,
    dragState,
    handleDragEnd, handleDragStart,
    InteractiveElem, onCursorMove,
    removeInteractiveElem, testIfCanBeDragged
} from "./cursor";
import GameScene from "../scenes/GameScene";
import {makePokemonSprite} from "./pokemon";
import {addToBox, removeFromTeam} from "../logic/box";
import {displayPokemonInfo, hidePokemonInfo} from "./pokemonInfoBox";
import {clamp, closest, wait} from "../utils/helpers";
import {Z} from "../data/depths";
import {gameState} from "../logic/gamestate";
import { drawTeamSizeCounter, getCoordsFromPosition, getPositionFromCoords } from "../logic/board";
import { playSound } from "../logic/audio";

let selectedIndex: number = -1
let interactiveElems: InteractiveElem[] = [];
const ox = 20, oy = 100,  WIDTH = 248, HEIGHT = 24;
const NB_ROWS = 1, NB_COLS = 8;
const CASE_SIZE = 28, CASE_GAP = 4, L = CASE_SIZE + CASE_GAP;

enum CursorZone { GRID, BOX, BUTTONS, RELEASE }
let cursorZone: CursorZone = CursorZone.BOX

export function openBox(game: GameScene){
    playSound("menu_open")
    openMenu({
        ref: "box",
        x: ox,
        y: oy,
        width: WIDTH + 16*2,
        height: HEIGHT + 16*2,
        background: "box1",
        offset: 8,
        draw(container){
            draw(game, container)
        },
        handleMove(moveVector){
            playSound("tick")

            const cursor = game.sprites.get("cursor")
            if(!cursor) return
            let x = cursor.x, y= cursor.y;

            if(moveVector.y > 0 && cursorZone === CursorZone.BOX){
                cursorZone = CursorZone.GRID
                y += 16
            } 
            else if(moveVector.y < 0 && cursorZone === CursorZone.GRID && y < 180){
                cursorZone = CursorZone.BOX
            } else if(moveVector.y > 0 && cursorZone === CursorZone.GRID && y > 260){
                cursorZone = CursorZone.BUTTONS
            } else if(moveVector.y < 0 && cursorZone === CursorZone.BUTTONS){
                cursorZone = CursorZone.GRID
            } else if(moveVector.y < 0 && cursorZone === CursorZone.BOX && dragState.draggedElem != null){
                cursorZone = CursorZone.RELEASE
            } else if(moveVector.y > 0 && cursorZone === CursorZone.RELEASE){
                cursorZone = CursorZone.BOX
            }

            x += moveVector.x;
            y += moveVector.y;

            if(cursorZone === CursorZone.BOX){
                selectedIndex = clamp(Math.round((x - (ox + 16 + CASE_GAP)) / L), 0, 7)
                x = ox + 20 + CASE_GAP + L*selectedIndex
                y = oy + 16 + CASE_GAP
            } else if(cursorZone === CursorZone.GRID){
                let [col, row] = getCoordsFromPosition(x, y+10);
                col = clamp(col, 0, 6);
                row = clamp(row, 4, 7);
                [x, y] = getPositionFromCoords(col, row)
                y -= 10
            } else if(cursorZone === CursorZone.BUTTONS){
                [x,y] = [closest(x, [100, 160, 220]), game.scale.height - 24]
            } else if(cursorZone === CursorZone.RELEASE){
                x = game.scale.width / 2 + 24
                y = 10
            }

            game.sprites.get("cursor")?.setPosition(x,y)
            onCursorMove()
        }
    })
}

function draw(game: GameScene, container: Phaser.GameObjects.Container) {
    //group.clear(true, true)
    interactiveElems.forEach(elm => removeInteractiveElem(elm))
    interactiveElems = []

    // layout
    let x = ox + 10 + CASE_GAP, y = oy + 10 + CASE_GAP
    const cases = game.add.graphics()
        .lineStyle(2, 0x000000, 0.1)
        .fillStyle(0xffeedd)

    for(let j=0; j< NB_ROWS; j++){
        for(let i=0; i<NB_COLS; i++){
            const caseIndex = j*NB_COLS + i;
            cases
                .fillRect(x+i*L, y+j*L, CASE_SIZE, CASE_SIZE)
                .moveTo(x + i*L,y + j*L)
                .lineTo(x + i*L + CASE_SIZE, y + j*L)
                .lineTo(x + i*L + + CASE_SIZE, y + j*L + + CASE_SIZE)
                .lineTo(x + i*L, y + j*L + + CASE_SIZE)
                .lineTo(x + i*L,y + j*L)

            const boxZone = game.add.zone(x+i*L+CASE_SIZE/2, y+j*L+CASE_SIZE/2, CASE_SIZE, CASE_SIZE)
            boxZone.setData("type", "boxTile")
            addInteractiveElem(boxZone);
            boxZone.on("dropReceived", () => {
                dropPokemonInBox(caseIndex, game)
            })
            boxZone.on("click", () => {
                if(dragState.draggedElem != null){ handleDragEnd(game) }
            })
            boxZone.on("over", () => {
                const pokemon = gameState.player.box[caseIndex];
                if(pokemon != null) displayPokemonInfo(pokemon)
            })
            boxZone.on("out", () => hidePokemonInfo())
            container.add(boxZone);
        }
    }
    cases.stroke().setDepth(Z.MENU_LAYOUT)
    container.add(cases);

    // pokemon
    gameState.player.box.forEach((pokemon, i) => {
        if(pokemon != null){
            const pokemonSprite = makePokemonSprite(pokemon, game);
            addToBoxPanel(pokemonSprite, i)
        }
    })
}

export function dropPokemonInBox(caseIndex:number, game: GameScene){
    const droppedPokemon = dragState.draggedElem?.getData("pokemon")
    if(droppedPokemon == null) return;

    const previousPokemonOnZone = gameState.player.box[caseIndex]
    if(previousPokemonOnZone != null){
        const newPokemonSprite = game.sprites.get(previousPokemonOnZone.uid)
        if(newPokemonSprite && testIfCanBeDragged(newPokemonSprite)){
            wait().then(() => handleDragStart(newPokemonSprite, game))
        }
    }

    removeFromTeam(droppedPokemon)
    addToBox(droppedPokemon, caseIndex)
    drawTeamSizeCounter()
}

export function addToBoxPanel(
    sprite: Phaser.GameObjects.Sprite,
    caseIndex: number
){
    gameState.activeMenu?.container?.add(sprite)
    const x = ox + 10 + CASE_GAP + CASE_SIZE/2 + (caseIndex%NB_COLS)*L
    const y = oy + 10 + CASE_GAP + CASE_SIZE/2 + Math.floor(caseIndex/NB_COLS)*L
    sprite.anims.pause()
    sprite.setAlpha(1)
        .setScale(1)
        .setDepth(Z.MENU_OBJECTS)
        .setPosition(x,y)
}
