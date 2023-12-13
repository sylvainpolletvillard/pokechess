import { MyScene } from "./MyScene";
import { loadSprites } from "../data/sprites";
import { loadSpritesheets } from "../data/spritesheets";
import { gameState } from "../logic/gamestate";
import { handleCursor, setupInputs } from "../logic/inputs";
import { clearTimeouts, wait } from "../utils/helpers";
import { generatePokemonsAnims } from "../logic/anims";
import { startMusic } from "../logic/audio";
import { clickEntry, MenuEntry, openMenu } from "../objects/menu";
import { hasSave } from "../logic/save";

export default class MenuScene extends MyScene {
  isIntroAnim = true;

  constructor() {
    super("MenuScene");
  }

  preload() {
    loadSprites(this);
    loadSpritesheets(this);
  }

  create() {
    gameState.activeScene = this;
    generatePokemonsAnims(this.anims);
    setupInputs(this);
    startMusic("music_opening");
    this.isIntroAnim = true;

    this.swipe("salameche", 100, "left", 120);
    this.swipe("bulbizarre", 800, "right", 240);
    this.swipe("carapuce", 1500, "left", 140);
    this.swipe("pikachu", 2200, "right", 260);
    this.swipe("minidraco", 2900, "left", 100);
    this.swipe("fantominus", 3600, "right", 220);

    this.swipeDiag("miaouss", 4300, "top-left", 1000);
    this.swipeDiag("machoc", 4800, "bottom-left", 1000);
    this.swipeDiag("roucool", 5300, "bottom-right", 1000);
    this.swipeDiag("melofee", 5800, "top-right", 1000);

    this.swipe("chenipan", 6700, "left", 60);
    this.swipe("racaillou", 6700, "right", 260);
    this.swipe("otaria", 7400, "left", 100);
    this.swipe("sabelette", 7400, "right", 220);
    this.swipe("nidoran_m", 8100, "left", 140);
    this.swipe("abra", 8100, "right", 180);

    this.finalPose(7700);
  }

  onPressStart() {
    this.handleClick();
  }

  onPressA() {
    if (gameState.activeMenu != null) clickEntry();
    else this.handleClick();
  }

  onPressB() {}

  onClick() {
    this.handleClick();
  }

  handleClick() {
    if (this.isIntroAnim) this.skipIntro();
  }

  update() {
    handleCursor(this);
  }

  drawMenu() {
    const entries: MenuEntry[] = [
      {
        label: "Nouvelle partie",
        x: 16,
        y: 0,
        value: "newgame",
      },
    ];
    if (hasSave()) {
      entries[0].y = 20;
      entries.unshift({
        label: "Continuer",
        x: 16,
        y: 0,
        value: "continue",
      });
    }

    openMenu({
      ref: "main_menu",
      x: 100,
      y: 260,
      width: 120,
      height: 44,
      background: "box2",
      offset: 16,
      entries,
      handleChoice(choice) {
        if (choice.value === "newgame") gameState.initGame(false);
        else if (choice.value === "continue") gameState.initGame(true);
      },
    });
  }

  swipe(name: string, delay: number, dir: "left" | "right", y: number) {
    const x = dir === "left" ? 350 : -30;
    const sprite = this.add
      .sprite(x, y, "pokemon_portraits")
      .play(name + "_portrait");
    this.tweens.add({
      targets: [sprite],
      delay,
      duration: 500,
      ease: "Linear",
      x: dir === "left" ? -30 : 350,
    });
  }

  swipeDiag(
    name: string,
    delay: number,
    dir: "top-left" | "top-right" | "bottom-left" | "bottom-right",
    duration: number = 1000
  ) {
    const x = dir === "top-left" || dir === "bottom-left" ? 350 : -30;
    const y = dir === "top-left" || dir === "top-right" ? 350 : -30;
    const sprite = this.add
      .sprite(x, y, "pokemon_portraits")
      .play(name + "_portrait");
    this.tweens.add({
      targets: [sprite],
      duration,
      delay,
      ease: "Linear",
      x: dir === "top-left" || dir === "bottom-left" ? -30 : 350,
      y: dir === "top-left" || dir === "top-right" ? -30 : 350,
    });
  }

  skipIntro() {
    clearTimeouts();
    this.tweens.tweens.forEach((tween) => {
      tween.targets.forEach((target) => {
        tween.stop();
        if (target instanceof Phaser.GameObjects.GameObject) target.destroy();
      });
    });
    this.finalPose(0, true);
  }

  finalPose(delay: number, immediate: boolean = false) {
    const logo = this.add.sprite(this.scale.width / 2, -100, "logo");
    this.sprites.set("logo", logo);

    const red = this.add
      .sprite(this.scale.width / 2 + 17, 399, "trainer")
      .setFrame(7);
    const minidraco = this.add
      .sprite(this.scale.width / 2 - 128, 396, "pokemon_portraits")
      .play("minidraco_portrait");
    const nidoran = this.add
      .sprite(this.scale.width / 2 - 115, 408, "pokemon_portraits")
      .play("nidoran_m_portrait");
    const abra = this.add
      .sprite(this.scale.width / 2 + 74, 400, "pokemon_portraits")
      .play("abra_portrait");
    const roucool = this.add
      .sprite(this.scale.width / 2 + 50, 397, "pokemon_portraits")
      .play("roucool_portrait");
    const melofee = this.add
      .sprite(this.scale.width / 2 - 74, 397, "pokemon_portraits")
      .play("melofee_portrait");
    const otaria = this.add
      .sprite(this.scale.width / 2 - 98, 422, "pokemon_portraits")
      .play("otaria_portrait");
    const pikachu = this.add
      .sprite(this.scale.width / 2 - 23, 404, "pokemon_portraits")
      .play("pikachu_portrait");
    const salameche = this.add
      .sprite(this.scale.width / 2 - 8, 430, "pokemon_portraits")
      .play("salameche_portrait");
    const bulbizarre = this.add
      .sprite(this.scale.width / 2 + 48, 426, "pokemon_portraits")
      .play("bulbizarre_portrait");
    const fantominus = this.add
      .sprite(this.scale.width / 2 + 114, 402, "pokemon_portraits")
      .play("fantominus_portrait");
    const sabelette = this.add
      .sprite(this.scale.width / 2 - 45, 412, "pokemon_portraits")
      .play("sabelette_portrait");
    const carapuce = this.add
      .sprite(this.scale.width / 2 - 70, 425, "pokemon_portraits")
      .play("carapuce_portrait");
    const machoc = this.add
      .sprite(this.scale.width / 2 + 142, 408, "pokemon_portraits")
      .play("machoc_portrait");
    const miaouss = this.add
      .sprite(this.scale.width / 2 + 82, 423, "pokemon_portraits")
      .play("miaouss_portrait");
    const racaillou = this.add
      .sprite(this.scale.width / 2 + 120, 429, "pokemon_portraits")
      .play("racaillou_portrait");
    const chenipan = this.add
      .sprite(this.scale.width / 2 - 138, 423, "pokemon_portraits")
      .play("chenipan_portrait");

    this.tweens.add({
      targets: [logo],
      y: 100,
      duration: immediate ? 0 : 2000,
      delay: immediate ? 0 : delay + 2000,
      ease: Phaser.Math.Easing.Bounce.Out,
    });

    this.tweens.add({
      targets: [
        red,
        salameche,
        pikachu,
        bulbizarre,
        carapuce,
        fantominus,
        chenipan,
        nidoran,
        minidraco,
        melofee,
        roucool,
        machoc,
        racaillou,
        otaria,
        sabelette,
        miaouss,
        abra,
      ],
      y: "-=200",
      duration: immediate ? 0 : 2500,
      delay: delay,
      ease: "Linear",
    });

    wait(immediate ? 0 : delay + 4000).then(() => {
      this.isIntroAnim = false;
      startMusic("music_overworld");
      this.drawMenu();
    });
  }
}
