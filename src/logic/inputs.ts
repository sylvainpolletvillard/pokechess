import Phaser from "phaser";
import {
    handleDragEnd,
    handleDragMove,
    handleDragStart,
    moveCursor, testIfCanBeDragged,
    updateCursorHover
} from "../objects/cursor";
import GameScene from "../scenes/GameScene";
import { gameState} from "./gamestate";
import { MyScene } from "../scenes/MyScene";
import {updatePokemonCaptureInfoPosition} from "../objects/pokemonCaptureBox";

export const buttonsMap = new Map([
    [Phaser.Input.Gamepad.Configs.XBOX_360.A, { id: "bouton_A", downColor: "#E71A07", upColor: "#2b2b2b" }],
    [Phaser.Input.Gamepad.Configs.XBOX_360.B, { id: "bouton_B", downColor: "#00AD3E", upColor: "#2b2b2b" }],
    [Phaser.Input.Gamepad.Configs.XBOX_360.START, { id: "bouton_START", downColor: "#666", upColor: "#2b2b2b" }],
    [Phaser.Input.Gamepad.Configs.XBOX_360.BACK, { id: "bouton_SELECT", downColor: "#666", upColor: "#2b2b2b" }],
    [Phaser.Input.Gamepad.Configs.XBOX_360.UP, { id: "fleche_HAUT", downColor: "#666", upColor: "#3a3a3a" }],
    [Phaser.Input.Gamepad.Configs.XBOX_360.LEFT, { id: "fleche_GAUCHE", downColor: "#666", upColor: "#3a3a3a" }],
    [Phaser.Input.Gamepad.Configs.XBOX_360.RIGHT, { id: "fleche_DROITE", downColor: "#666", upColor: "#3a3a3a" }],
    [Phaser.Input.Gamepad.Configs.XBOX_360.DOWN, { id: "fleche_BAS", downColor: "#666", upColor: "#3a3a3a" }],
]);

let wasdKeys: any;
let cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
let cursorBlockerFlag: boolean = false;
let cursorBlockerTimer: Phaser.Time.TimerEvent;

const DRAG_DISTANCE_THRESHOLD = 3;
const DRAG_TIME_THRESHOLD = 300;

export function setupInputs(scene: MyScene){
    cursorKeys = scene.input.keyboard.createCursorKeys();

    scene.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
        console.log('gamepad connected', pad.id);

        pad.on('down', (buttonIndex: number) => {
            const button = buttonsMap.get(buttonIndex)
            if(button != null){
                const gbButton = document.getElementById(button.id)
                if(gbButton != null) gbButton.style.fill = button.downColor;
            }
            handleControlPress(buttonIndex, scene)
        });

        pad.on('up', (buttonIndex: number) => {
            const button = buttonsMap.get(buttonIndex)
            if(button != null){
                const gbButton = document.getElementById(button.id)
                if(gbButton != null) gbButton.style.fill = button.upColor;
            }
        });
    });

    scene.input.keyboard.on('keydown', function (event: KeyboardEvent) {
        event.preventDefault()
        handleKeyPress(event.key, scene)
    });

    wasdKeys = scene.input.keyboard.addKeys('W,A,S,D,Z,Q');

    setupCursor(scene);
}

export function setupCursor(scene: MyScene){
    scene.input.setDefaultCursor("none");
    scene.input.dragDistanceThreshold = DRAG_DISTANCE_THRESHOLD;
    scene.input.dragTimeThreshold = DRAG_TIME_THRESHOLD
    scene.add.zone(32,32,320,320)

    scene.input.on('pointerup', (e: PointerEvent) => {
        if(scene.input.activePointer.getDuration() < DRAG_TIME_THRESHOLD && scene.input.activePointer.getDistance() < DRAG_DISTANCE_THRESHOLD){
            scene.onClick && scene.onClick(e)
        }
    });

    scene.input.on('pointermove', (pointer: PointerEvent) => {
        onPointerMove(scene, pointer)
    })

    scene.input.on('dragstart', (pointer: PointerEvent, gameObject: Phaser.GameObjects.Sprite) => {
        if(testIfCanBeDragged(gameObject)){
            handleDragStart(gameObject, scene)
        }
    })

    scene.input.on('dragend', (pointer: PointerEvent) => {
        handleDragEnd(scene);
    })

    scene.input.on('drag', function (pointer: PointerEvent, gameObject: any, dragX: number, dragY: number) {
        handleDragMove(scene);
    });
}

export function getMovementVector(scene: Phaser.Scene): { moveVector: Phaser.Math.Vector2, useAnalogMovement: boolean } {
    let moveVector = new Phaser.Math.Vector2(0,0);
    let useAnalogMovement = false;

    if (scene.input.gamepad.total > 0) {
        const pad = scene.input.gamepad.getPad(0)

        if (pad.axes.length) {
            const axeVector = new Phaser.Math.Vector2(pad.axes[0].getValue() , pad.axes[1].getValue())
            if(axeVector.length() > 0.3){
                moveVector = axeVector.scale(5)
                useAnalogMovement = true;
                return { moveVector, useAnalogMovement }
            }
        }

        if (pad.isButtonDown(Phaser.Input.Gamepad.Configs.XBOX_360.LEFT)) moveVector.x = -32
        else if(pad.isButtonDown(Phaser.Input.Gamepad.Configs.XBOX_360.RIGHT)) moveVector.x = 32
        if(pad.isButtonDown(Phaser.Input.Gamepad.Configs.XBOX_360.UP)) moveVector.y = -32
        else if(pad.isButtonDown(Phaser.Input.Gamepad.Configs.XBOX_360.DOWN)) moveVector.y = 32
    }

    if (cursorKeys.left.isDown || wasdKeys.Q.isDown || wasdKeys.A.isDown) moveVector.x = -32
    else if(cursorKeys.right.isDown || wasdKeys.D.isDown) moveVector.x = 32
    if(cursorKeys.up.isDown || wasdKeys.W.isDown || wasdKeys.Z.isDown) moveVector.y = -32
    else if(cursorKeys.down.isDown || wasdKeys.S.isDown) moveVector.y = 32

    return { moveVector, useAnalogMovement }
}

export function handleCursor(scene: MyScene) {
    const { moveVector, useAnalogMovement } = getMovementVector(scene);
    if(useAnalogMovement) moveCursor(moveVector, scene, false)

    if(moveVector.length() === 0){
        cursorBlockerTimer && cursorBlockerTimer.destroy()
        cursorBlockerFlag = false;
    } else if(moveVector.length() > 0 && !cursorBlockerFlag){
        cursorBlockerFlag = true;
        cursorBlockerTimer = scene.time.addEvent({ delay: 150, callback: () => { cursorBlockerFlag = false }})
        if(gameState.activeMenu != null && gameState.activeMenu.handleMove != null) gameState.activeMenu.handleMove(moveVector)
        else moveCursor(moveVector, scene, true)
    }

    return null
}

export function handleControlPress(button: number, scene: MyScene){
    switch(button){
        case Phaser.Input.Gamepad.Configs.XBOX_360.A: onPressA(); break;
        case Phaser.Input.Gamepad.Configs.XBOX_360.B: onPressB(); break;
        case Phaser.Input.Gamepad.Configs.XBOX_360.START: onPressStart(); break;
    }
}

export function handleKeyPress(key: string, scene: MyScene){
    switch(key){
        case "a":
        case "e":
        case " ":
            onPressA()
            break;

        case "b":
        case "x":
        case "Escape":
            onPressB()
            break;

        case "Enter":
            onPressStart()
            break;
    }

}

export function onPointerMove(scene: MyScene, pointer: PointerEvent){
    scene.sprites.get("cursor")?.setPosition(
        Phaser.Math.Clamp(pointer.x, 0, scene.scale.width - 15),
        Phaser.Math.Clamp(pointer.y, 0, scene.scale.height - 15)
    )
    updateCursorHover(scene)
    handleDragMove(scene)
    updatePokemonCaptureInfoPosition(scene as GameScene)
}

function onPressA(){
    if(gameState.activeScene?.onPressA){ gameState.activeScene.onPressA() }
}

function onPressB(){
    if(gameState.activeMenu != null){ gameState.activeMenu.handleCancel!() }
    else if(gameState.activeScene?.onPressB){ gameState.activeScene.onPressB() }
}

function onPressStart(){
    if(gameState.activeScene?.onPressStart){ gameState.activeScene.onPressStart() }
}