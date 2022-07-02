import GameScene from "../scenes/GameScene";
import { Z } from "../data/depths";
import { Trainer } from "../types/trainer";
import { RoomType, RoomArena } from "../types/destination";
import { tweenFadeInOut } from "../utils/tweens";
import { gameState } from "../logic/gamestate";

export function drawTrainers(game: GameScene){
    const player = game.add.sprite(32, game.scale.height - 32, "player").setDepth(Z.PLAYER)
    game.sprites.set("player", player)
    player.play("trainer_idle");

    if([RoomType.ARENA, RoomType.TUTORIAL, RoomType.PENSION].includes(game.state.currentRoom.type)){
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
}

export function showTrainerIntro(trainer: Trainer){
    const scene = gameState.activeScene as GameScene
    if(trainer.introFrameIndex === null) return Promise.resolve(); // no intro
    const portrait = scene.add.sprite(scene.scale.width/2, scene.scale.height/2, "trainers_intros")
    portrait.setDepth(Z.CENTER_TEXT).setFrame(trainer.introFrameIndex)
    scene.sprites.set("centerIntro", portrait)
    return tweenFadeInOut(scene, portrait, 2000);
}