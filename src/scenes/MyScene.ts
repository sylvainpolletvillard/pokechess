import Phaser from "phaser";

export class MyScene extends Phaser.Scene {
    sprites: Map<string, Phaser.GameObjects.Sprite>;
    graphics: Map<string, Phaser.GameObjects.Graphics>;

    constructor(ref: string) {
        super(ref);
        this.sprites = new Map();
        this.graphics = new Map();
    }

    onPressA(){}
    onPressB(){}
    onPressStart(){}

    onClick(e: PointerEvent){}


}