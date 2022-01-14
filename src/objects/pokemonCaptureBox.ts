import GameScene from "../scenes/GameScene";
import {addText} from "../utils/text";
import {Pokemon} from "../data/pokemons";
import {Z} from "../data/depths";
import {POKEBALL_LABEL_COLORS} from "../data/pokeballs";
import {gameState} from "../logic/gamestate";
import {PokemonOnBoard} from "./pokemon";

let currentPokemonCaptureInfoDisplayed: Pokemon | null;
let pokemonCaptureBox: Phaser.GameObjects.Container | null;
let pokeballOnHand: Phaser.GameObjects.Sprite | null;

const WIDTH = 100, HEIGHT = 32;

export function displayPokemonCaptureInfo(pokemon: PokemonOnBoard, game: GameScene){
    if(currentPokemonCaptureInfoDisplayed === pokemon) return;
    if(currentPokemonCaptureInfoDisplayed != null) hidePokemonCaptureInfo(game);
    currentPokemonCaptureInfoDisplayed = pokemon

    pokemonCaptureBox = game.add.container(
        game.input.activePointer.x - WIDTH - 8,
        game.input.activePointer.y - HEIGHT - 8
    );

    const pokemonInfoBoxBackground = game.add.nineslice(
        0, 0,   // this is the starting x/y location
        WIDTH, HEIGHT,   // the width and height of your object
        'box2', // a key to an already loaded image
        4,         // the width and height to offset for a corner slice
    )
    pokemonCaptureBox.add(pokemonInfoBoxBackground)

    if(gameState.player.inventory.pokeball < pokemon.cost){
        const text1 = addText(6, 2, `Pas assez de`)
        const text2 = addText(6, 16, `pokeballs !`)
        pokemonCaptureBox.add(text1).add(text2)
    } else if(gameState.player.hasBoxFull) {
        const text1 = addText(6, 2, `Box Pokemon`)
        const text2 = addText(6, 16, `pleine !`)
        pokemonCaptureBox.add(text1).add(text2)
    } else {
        const text1 = addText(6, 2, `Capturer avec`)
        const text2 = addText(6, 16, pokemon.pokeball, { color: POKEBALL_LABEL_COLORS[pokemon.pokeball] })
        pokemonCaptureBox.add(text1).add(text2)

        pokeballOnHand = game.add.sprite(
            Math.floor(game.input.activePointer.x +8),
            Math.floor(game.input.activePointer.y +12),
            "pokeball"
        )
        pokeballOnHand
            .play(`${pokemon.pokeball}_idle`)
            .setDepth(Z.JUST_BELOW_CURSOR)

        game.sprites.get("cursor")?.play("cursor_wave")
    }

    const pokeballCostSprite = game.add.sprite(74,22, "pokeball", 25)
    pokeballCostSprite.play("POKEBALL_idle")
    const pokemonCostText = addText(84, 16, `x${pokemon.cost}`)
    pokemonCaptureBox.add(pokeballCostSprite).add(pokemonCostText)

    pokemonCaptureBox.setDepth(Z.MENU);
}

export function updatePokemonCaptureInfoPosition(game: GameScene){
    if(!currentPokemonCaptureInfoDisplayed) return;
    pokemonCaptureBox?.setPosition(
        Math.max(2, Math.floor(game.input.activePointer.x - WIDTH - 8)),
        Math.max(0, Math.floor(game.input.activePointer.y - HEIGHT - 8))
    )
    pokeballOnHand?.setPosition(
        Math.floor(game.input.activePointer.x +8),
        Math.floor(game.input.activePointer.y +12)
    )
}

export function hidePokemonCaptureInfo(game: GameScene){
    if(!pokemonCaptureBox) return;
    pokemonCaptureBox.destroy(true)
    pokemonCaptureBox = null;

    pokeballOnHand?.destroy(true)
    pokeballOnHand = null;

    currentPokemonCaptureInfoDisplayed = null

    game.sprites.get("cursor")?.play("cursor_point")
}

export function getCurrentPokemonCaptureInfoDisplayed(){
    return currentPokemonCaptureInfoDisplayed
}