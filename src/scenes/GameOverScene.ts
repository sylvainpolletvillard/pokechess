import { Z } from "../data/depths";
import { loadFonts } from "../data/fonts";
import { Pokemon } from "../data/pokemons";
import { loadSprites } from "../data/sprites";
import { loadSpritesheets } from "../data/spritesheets";
import { gameState } from "../logic/gamestate";
import { setupInputs } from "../logic/inputs";
import { wait } from "../utils/helpers";
import { addText } from "../utils/text";
import {MyScene} from "./MyScene";

export default class GameOverScene extends MyScene {
  constructor() {
    super("GameOverScene");
  }

  preload() {
    loadFonts(this)
    loadSprites(this)
    loadSpritesheets(this);
  }

  create(){
    gameState.activeScene = this
    setupInputs(this)
    this.displayEndScreen();
  }

  canInteract = false

  onPressStart() {
    this.handleClick();
  }

  onPressA() {
    this.handleClick();
  }

  onClick() {
    this.handleClick();
  }

  handleClick() {
    if(this.canInteract) this.scene.start("MenuScene");
  }

  async displayEndScreen() {
    gameState.player.team.forEach((pokemon, i) => {
      wait(3000 * i).then(() => this.displayEndScreenPokemonInfo(pokemon));
    });

    await wait(18000);    
    this.displayPlayerResume()
    await wait(10000)
    this.canInteract = true
  }

  displayEndScreenPokemonInfo(pokemon: Pokemon) {
    const pokemonInfoBox = this.add.group();

    let oy = game.scale.height + 80;
    let ox = game.scale.width / 2;

    const pokemonInfoBoxBackground = this.add
      .nineslice(
        ox,
        oy, // this is the starting x/y location
        280,
        84, // the width and height of your object
        "box1", // a key to an already loaded image
        8 // the width and height to offset for a corner slice
      )
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0);
    pokemonInfoBox.add(pokemonInfoBoxBackground);

    let name = pokemon.entry.name;
    const pokemonNameText = addText(
      ox - 50,
      oy - 28,
      `${name} Lv${pokemon.level}`
    );
    pokemonInfoBox.add(pokemonNameText);

    const portrait = this.add.sprite(ox - 92, oy - 1, "pokemon_portraits");
    portrait.play(`${pokemon.entry.ref}_portrait`);
    portrait.setScrollFactor(0);
    pokemonInfoBox.add(portrait);

    for (let i = 0; i < pokemon.entry.types.length; i++) {
      const typeSprite = this.add.sprite(
        ox + 112 - i * 20,
        oy - 22,
        "icons16x16",
        pokemon.entry.types[i].frameIndex
      );
      typeSprite.setScrollFactor(0);
      pokemonInfoBox.add(typeSprite);
    }

    this.tweens.add({
      targets: pokemonInfoBox.getChildren(),
      y: -80,
      duration: 16000,
      ease: "Linear",
      onComplete() {
        pokemonInfoBox.destroy();
      },
    });

    pokemonInfoBox.setDepth(Z.MENU);
  }

  displayPlayerResume() {
    const box = this.add.group();

    let oy = game.scale.height + 80;
    let ox = game.scale.width / 2;

    const boxBackground = this.add
      .nineslice(
        ox,
        oy, // this is the starting x/y location
        280,
        84, // the width and height of your object
        "box1", // a key to an already loaded image
        8 // the width and height to offset for a corner slice
      )
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0);
    box.add(boxBackground);

    box.add(addText(ox - 120, oy - 20, `Durée jeu: ${gameState.day} tours`));
    box.add(addText(ox - 120, oy+8, `Pokédex`));
    box.add(addText(ox-50, oy+8, `Vus: 133`));
    box.add(addText(ox+20, oy+8, `Pris: 30`));

    const portrait = this.add.sprite(ox + 100, oy-1, "trainer").setFrame(7);
    portrait.setScrollFactor(0);    
    box.add(portrait);

    this.tweens.add({
        targets: box.getChildren(),
        y: "-= 240",
        duration: 8000,
        ease: "Linear"
      });
  }
}
