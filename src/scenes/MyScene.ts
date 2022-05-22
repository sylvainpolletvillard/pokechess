import Phaser from "phaser";

export class MyScene extends Phaser.Scene {
    sprites: Map<string, Phaser.GameObjects.Sprite>;
    objects: Map<string, Phaser.GameObjects.GameObject>;
    graphics: Map<string, Phaser.GameObjects.Graphics>;

    constructor(ref: string) {
        super(ref);
        this.sprites = new Map();
        this.objects = new Map();
    }

    onPressA(){}
    onPressB(){}
    onPressStart(){}

    onClick(e: PointerEvent){}

    preload(){ }
    create(){ }

}