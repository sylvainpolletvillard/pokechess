import baragouin from "baragouin";
import {addText} from "../utils/text";
import {gameState} from "./gamestate";
import {Z} from "../data/depths";
import {Character, CHARACTER_STATE} from "../objects/character";
import {DIALOGS} from "../data/dialogs";
import {DEFAULT_VOICE, VoiceConfig, voicesByActor} from "../data/voices";
import {MyScene} from "../scenes/MyScene";
import {closeMenu, Menu, openMenu} from "../objects/menu";
import { wait } from "../utils/helpers";

export type DialogLine = string | DialogChoice | DialogLine[] | null | Promise<DialogLine> | (() => DialogLine);

export interface Dialog {
    lines: DialogLine[];
    speaker: string;
    voice: VoiceConfig;
    params: DialogParams;
    dialogGroup: Phaser.GameObjects.Group;
    textSprite: Phaser.GameObjects.Text;
    bgSprite: Phaser.GameObjects.RenderTexture;
    speech?: any;
    choice?: Menu;
    selectedChoice?: any;
    onEnd?: () => any;
    waitBeforeNextLine?: boolean;
}

export interface DialogParams {
    speaker?: string;
    wait?: number;
}

export type DialogChoice = { [option: string]: () => any }

export function startDialog(lines: DialogLine[], params: DialogParams = {}): Promise<null>{
    const scene = gameState.activeScene
    if(!scene) return Promise.reject("No scene");

    let speaker = params.speaker ?? "system";

    let voice = Object.assign({}, DEFAULT_VOICE, voicesByActor[speaker ?? "red"], params)

    let ox = 60;
    let oy = scene.scale.height - 38
    const W = 220
    const H = 34

    const dialogGroup = scene.add.group().setOrigin(0,0)

    const bgSprite = scene.add.nineslice(
        ox, oy,   // this is the starting x/y location
        W, H,   // the width and height of your object
        'box2', // a key to an already loaded image
        4,   // the width and height to offset for a corner slice
    ).setScrollFactor(0).setDepth(Z.DIALOG);
    dialogGroup.add(bgSprite)

    const textSprite = addText(ox+8, oy+4, "", {
        wordWrap: { width: W-8 },
    }).setScrollFactor(0).setResolution(2)
    dialogGroup?.add(textSprite)?.setDepth(Z.DIALOG)

    gameState.activeDialog = { lines: [...lines], speaker, voice, dialogGroup, textSprite, bgSprite }

    const dialogPromise = new Promise((resolve) => {
        gameState.activeDialog!.onEnd = () => wait(0).then(() => resolve(null))
    })

    showNextLine()

    if(params.wait && gameState.activeDialog){
        
    }

    return dialogPromise
}

export function waitBeforeNextLine(delay: number){
    if(gameState.activeDialog){
        gameState.activeDialog.waitBeforeNextLine = true;
        setTimeout(() => {
            if(gameState.activeDialog){
                gameState.activeDialog.waitBeforeNextLine = false;
            }
        }, delay)
    }
}

export async function showNextLine(){
    if(!gameState.activeDialog || !gameState.activeScene || gameState.activeDialog.waitBeforeNextLine) return;
    if (gameState.activeDialog.speech) {
        gameState.activeDialog.speech.stop()
        delete gameState.activeDialog.speech
        return
    }

    let line = gameState.activeDialog.lines.shift();

    while (typeof line === "function" || Array.isArray(line) || line instanceof Promise) {
        if (typeof line === "function") line = line()
        if(line instanceof Promise) line = await line;
        if (Array.isArray(line)) {
            gameState.activeDialog.lines.unshift(...line)
            line = gameState.activeDialog.lines.shift()
        }
    }

    if (typeof line === "string") {
        sayLine(line)
    } else if(typeof line === "object" && line !== null){
        startChoice(line)
    } else {
        endDialog()
    }
}

export function sayLine(line: string) {
    if(!gameState.activeDialog) return
    if(!['me','system'].includes(gameState.activeDialog.speaker)){
        gameState.activeDialog.bgSprite.setPosition(48, 2)
        gameState.activeDialog.textSprite.setPosition(56, 6)
    }

    if (gameState.activeDialog.voice.skipSpeech) {
        gameState.activeDialog.textSprite.text = line
        return
    }

    gameState.activeDialog.speech = baragouin(
        line,
        Object.assign(
            {
                onNote(text: string) {
                    gameState.activeDialog?.textSprite.setText(text)
                },
                onEnd(text: string) {
                    gameState.activeDialog?.textSprite.setText(text)
                    delete gameState.activeDialog?.speech
                }
            },
            gameState.activeDialog.voice
        )
    )
}

export function endDialog() {
    if (gameState.activeDialog) {
        gameState.activeDialog.dialogGroup?.destroy(true, true)
        gameState.activeDialog.onEnd && gameState.activeDialog.onEnd()
        gameState.activeDialog = null
    }
}

export function startChoice(choice: DialogChoice) {
    let options = Object.keys(choice)
    const scene = gameState.activeScene as MyScene

    const width = Math.max(...options.map(text => text.length))*8 + 16
    const height = 8 + 16 * options.length
    let ox = scene.scale.width - width - 28;
    let oy = scene.scale.height - 32 - height

    gameState.activeDialog!.choice = openMenu({
        ref: "dialogChoice",
        x: ox,
        y: oy,
        width,
        height,
        entries: Object.entries(choice).map(([label, value], i) => ({
            label, value, x: 4, y: i*16
        })),
        handleChoice(selectedChoice){
            if(!gameState.activeDialog?.choice) return;
            delete gameState.activeDialog.choice
            closeMenu()
            gameState.activeDialog.lines.unshift(selectedChoice?.value || selectedChoice?.label)
            showNextLine()
        }
    })
}

let talkingTo: string | null = null;
export function talkTo(pnj: Character, playerState: CHARACTER_STATE){
    if(talkingTo != null) return; // already talking to someone

    // talk to someone
    switch (playerState) {
        case CHARACTER_STATE.LEFT:
        case CHARACTER_STATE.WALKING_LEFT:
            pnj.state = CHARACTER_STATE.RIGHT;
            break;
        case CHARACTER_STATE.RIGHT:
        case CHARACTER_STATE.WALKING_RIGHT:
            pnj.state = CHARACTER_STATE.LEFT;
            break;
        case CHARACTER_STATE.UP:
        case CHARACTER_STATE.WALKING_UP:
            pnj.state = CHARACTER_STATE.DOWN;
            break;
        case CHARACTER_STATE.DOWN:
        case CHARACTER_STATE.WALKING_DOWN:
            pnj.state = CHARACTER_STATE.UP;
            break;
    }

    if(!gameState.dialogStates.hasOwnProperty(pnj.name)){
        gameState.dialogStates[pnj.name] = 0
    }

    if(!DIALOGS.hasOwnProperty(pnj.name)){
        DIALOGS[pnj.name] = () => startDialog(["..?"]);
    }

    talkingTo = pnj.name;
    return DIALOGS[pnj.name]().then(() => {
        talkingTo = null;
    })

}