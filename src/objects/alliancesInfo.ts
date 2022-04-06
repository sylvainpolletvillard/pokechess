import GameScene from "../scenes/GameScene";
import {gameState} from "../logic/gamestate";
import { addInteractiveElem } from "./cursor";
import { displayAllianceInfo, hideAllianceInfo } from "./allianceInfoBox";
import { PokemonOnBoard } from "./pokemon";
import { getAlliancesState } from "../logic/player";

let leftGroup: Phaser.GameObjects.Group | null = null
let rightGroup: Phaser.GameObjects.Group | null = null

export function drawAlliancesInfo(team: PokemonOnBoard[]){
    const game = gameState.activeScene as GameScene;
    const left = (team === gameState.board.playerTeam)
    const alliances = getAlliancesState(team)

    if(left && leftGroup) leftGroup.destroy(true, true)         
    else if(!left && rightGroup) rightGroup.destroy(true, true)         

    const group = game.add.group()
    if(left) leftGroup = group
    else rightGroup = group

    alliances.forEach((allianceState, index) => {
        let x = left ? 14 : game.scale.width - 14
        let y = left ? game.scale.height - 74 - index*24 : 74 + index*24
        let d = left ? +1 : -1
        const counterGraphics = game.add.graphics()
                
        counterGraphics.fillStyle(0x000000, 0.5).fillCircle(x, y+4, 9)

        let cx = left ? x+8 : x - 23
        counterGraphics.fillStyle(0x000000,1).fillRoundedRect(cx, y, 15, 8, 3)
        counterGraphics.lineStyle(0x000000,0.8).strokeRect(cx+5, y, 5, 8)
        for(let c=0; c<3; c++){            
            counterGraphics.fillStyle(c < allianceState.stepReached ? 0xffffff : 0x666666, 1).fillRoundedRect(cx+(left?0:12)+(c*5+1)*d, y+1, 3, 6, 2)
        }

        group.add(counterGraphics)

        const typeSprite = game.add.sprite(x, y+4, "icons16x16", allianceState.type.frameIndex)
        group.add(typeSprite)

        addInteractiveElem(typeSprite)
        typeSprite
            .on("over", () => displayAllianceInfo(allianceState.type, left ? 0 : 1))
            .on("out", () => hideAllianceInfo())
    })
}