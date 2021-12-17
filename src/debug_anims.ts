import Phaser from 'phaser';
import TestAnimsScene from "./scenes/TestAnims";

export function startDebugAnims(){

    // @ts-ignore
    document.getElementById("gameboy").remove()
    // @ts-ignore
    document.getElementById("game").setAttribute("style", `width: 1920px; height: 1080px; left: auto; position: static`);

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: 'game',
        backgroundColor: '#33A5E7',
        scale: {
            width: 1920,
            height: 1080,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [TestAnimsScene]
    });

    // @ts-ignore
    globalThis.game = game;

}

