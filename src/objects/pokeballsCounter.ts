import { RoomType } from "../logic/destination";
import { gameState } from "../logic/gamestate";
import RoomScene from "../scenes/RoomScene";
import { MyScene } from "../scenes/MyScene";
import { addText } from "../utils/text";

let pokeballsCounterGroup: Phaser.GameObjects.Group;

export function drawPokeballsCounter(scene: MyScene){
    if(pokeballsCounterGroup != null) pokeballsCounterGroup.destroy(true, true)

    let ox = game.scale.width - 64

    if(gameState.currentRoom.type === RoomType.TUTORIAL){
        ox = -16
    }

    let pokeballPos = [ox, -16],
        counterPos = [ox + 40, 8];

    if(scene instanceof RoomScene){
      counterPos = [28, 8];
      pokeballPos = [32, 48];
    }
    const pokeball = scene.add.sprite(pokeballPos[0], pokeballPos[1], "pokeball", 0)
    pokeball.play(`POKEBALL_${pokeballsCounterGroup ? 'jiggle_once' : 'in'}`)
        .once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => pokeball.play(`POKEBALL_idle`))
        .setOrigin(0,0)

    scene.sprites.set("pokeball", pokeball)
    const pokeballCount = addText(counterPos[0], counterPos[1], gameState.player.inventory.pokeball.toString(), {
        align: "left",
        color: "white"
    })
    pokeballCount.setStroke("#000000", 3);
    pokeballsCounterGroup = scene.add.group([pokeball, pokeballCount])
}