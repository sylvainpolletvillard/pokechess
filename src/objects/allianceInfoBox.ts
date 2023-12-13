import {addText} from "../utils/text";
import {Z} from "../data/depths";
import {GameStage, gameState} from "../logic/gamestate";
import {MyScene} from "../scenes/MyScene";
import { PokemonType } from "../data/types";
import { ALLIANCES } from "../data/alliances";

let currentTypeDisplayed: PokemonType | null;
let currentPlayerDisplayed: number | null;
let allianceInfoBox: Phaser.GameObjects.Group | null;

export function showAllianceInfoBox(type: PokemonType, player: number){
    const scene = gameState.activeScene as MyScene;
    if(gameState.activeMenu != null) return;
    if(currentTypeDisplayed === type && gameState.stage !== GameStage.FIGHT) return;
    if(currentTypeDisplayed != null) hideAllianceInfoBox();
    currentTypeDisplayed = type
    currentPlayerDisplayed = player

    allianceInfoBox = scene.add.group();

    let oy = 20;
    let ox = game.scale.width / 2

    const allianceInfoBoxBackground = scene.add.nineslice(
        ox, oy,   // this is the starting x/y location
        'box1', // a key to an already loaded image
        undefined, // an optional frame from the Texture this Game Object is rendering with.
        200, 140,   // the width and height of your object        
        8, 8, 8, 8        // the width and height to offset for a corner slice
    ).setOrigin(0.5,0).setScrollFactor(0);

    allianceInfoBox.add(allianceInfoBoxBackground)

    const allianceNameText = addText(ox - 60, oy + 16, `${type.label}`)
    allianceInfoBox.add(allianceNameText)
    
    const icon = scene.add.sprite(ox-78, oy+24, "icons16x16", type.frameIndex)    
    icon.setScrollFactor(0);
    allianceInfoBox.add(icon)

    const alliance = ALLIANCES[type.ref]

    let y = oy+40
    const allianceDescriptionText = addText(ox - 86, y, `${alliance.description}`, {
        color: "black",
        fontSize: "10px",
        wordWrap: {width: 180}
    })
    allianceInfoBox.add(allianceDescriptionText)    
    
    const alliances = player === 0 ? gameState.board.playerAlliances : gameState.board.otherTeamAlliances
    const allianceState = alliances.get(type)!    
    y += allianceDescriptionText.height + 10
    alliance.steps.forEach((step, i) => {
        const stepText = addText(ox - 86, y, `[${step.numberRequired}] ${step.description}`, {
            color: allianceState.stepReached?.ref === step.ref ? "blue" : "gray",
            fontSize: "10px",
            wordWrap: { width: 172 }
        })
        allianceInfoBox!.add(stepText)
        y+=stepText.height
    })

    allianceInfoBox.setDepth(Z.MENU)
}

export function hideAllianceInfoBox(){
    if(!allianceInfoBox) return;
    allianceInfoBox.destroy(true)
    allianceInfoBox = null;
    currentTypeDisplayed = null
    currentPlayerDisplayed = null
}

export function getCurrentAllianceInfoDisplayed(){
    return currentTypeDisplayed
}

export function updateAllianceInfoBox(){
    if(currentTypeDisplayed && currentPlayerDisplayed){
        showAllianceInfoBox(currentTypeDisplayed, currentPlayerDisplayed)
    }
}