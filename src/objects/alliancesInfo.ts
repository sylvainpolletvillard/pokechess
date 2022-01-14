import GameScene from "../scenes/GameScene";
import {POKEMON_TYPES} from "../data/types";
import {PokemonOnBoard} from "./pokemon";
import {gameState} from "../logic/gamestate";

type AllianceCount = { [type: string]: number }
let alliancesInfoGroup: Phaser.GameObjects.Group | null = null;

export function countByType(team: PokemonOnBoard[]): AllianceCount {
    return team.reduce((count: AllianceCount, pokemon: PokemonOnBoard) => {
        return Object.assign(count, ...pokemon.types.map(type => ({ [type.ref]: (count[type.ref] ?? 0) + 1})))
    }, {})
}

export function drawAlliancesInfo(playerIndex: number){
    const game = gameState.activeScene as GameScene;
    const team: PokemonOnBoard[] = gameState.players[playerIndex].team;
    const alliances = countByType(team)
    if(alliancesInfoGroup != null){
        alliancesInfoGroup.destroy(true, true)
    }

    alliancesInfoGroup = game.add.group()
    Object.entries(alliances).forEach(([type , count], index) => {
        const counterGraphics = game.add.graphics()
        counterGraphics
            .fillStyle(0x000000, 0.5)
            .fillCircle(14, game.scale.height - 70 - index*24, 9)

        for(let c=0; c<6; c++){
            counterGraphics.fillStyle(0x000000,0.8).fillRect(
                26+(c%3)*4,
                game.scale.height - 75 - index*24 + Math.floor(c/3)*7,
                4,
                4
            )
            counterGraphics.fillStyle(0x666666, 1).fillRect(
                26+(c%3)*4+1,
                game.scale.height - 74 - index*24 + Math.floor(c/3)*7,
                3,
                3
            )
        }
        for(let c=0; c<count; c++){
            counterGraphics.fillStyle(0xffffff, 1).fillRect(
                26+(c%3)*4+1,
                game.scale.height - 74 - index*24 + Math.floor(c/3)*7,
                3,
                3
            )
        }


        alliancesInfoGroup?.add(counterGraphics)

        const typeSprite = game.add.sprite(14, game.scale.height - 70 - index*24, "icons16x16", POKEMON_TYPES[type].frameIndex)
        alliancesInfoGroup?.add(typeSprite)
    })
}