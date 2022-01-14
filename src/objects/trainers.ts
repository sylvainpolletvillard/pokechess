import GameScene from "../scenes/GameScene";
import { Z } from "../data/depths";
import { Trainer } from "../data/trainers";
import { RoomType, RoomArena } from "../logic/destination";
import { tweenFade } from "../utils/tweens";
import { drawAlliancesInfo } from "./alliancesInfo";

export function drawTrainers(game: GameScene){
    const player = game.add.sprite(32,game.scale.height - 32, "player").setDepth(Z.PLAYER)
    game.sprites.set("player", player)
    player.play("trainer_idle");

    if([RoomType.ARENA, RoomType.TUTORIAL].includes(game.state.currentRoom.type)){
        const arena = game.state.currentRoom as RoomArena
        const trainer = game.add.sprite(game.scale.width + 40, 32, "trainer")
            .setDepth(Z.TRAINER)
            .setFrame(arena.trainer.frameIndex)
        game.add.tween({
            targets: [trainer],
            delay: 1000,
            duration: 600,
            x: "-=64",
            ease: 'Linear'
        })
        game.sprites.set("opponent", trainer)
    }

    drawAlliancesInfo(0)
    //drawAlliancesInfo(1, game)
}

export function showTrainerIntro(trainer: Trainer, game: GameScene){
    if(trainer.introFrameIndex === null) return Promise.resolve(); // no intro
    const portrait = game.add.sprite(game.scale.width/2, game.scale.height/2, "trainers_intros")
    portrait.setDepth(Z.CENTER_TEXT).setFrame(trainer.introFrameIndex)
    game.sprites.set("centerIntro", portrait)
    return tweenFade(game, portrait, 2000);
}