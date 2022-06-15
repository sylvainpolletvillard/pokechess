import {addText} from "../utils/text";
import {Pokemon} from "../data/pokemons";
import {PokemonOnBoard} from "./pokemon";
import {Z} from "../data/depths";
import {GameStage, gameState} from "../logic/gamestate";
import {MyScene} from "../scenes/MyScene";
import {METAMORPH} from "../data/pokemons/metamorph";

let currentPokemonInfoDisplayed: Pokemon | null;
let pokemonInfoBox: Phaser.GameObjects.Group | null;

export function displayPokemonInfo(pokemon: Pokemon){
    const scene = gameState.activeScene as MyScene;
    if(currentPokemonInfoDisplayed === pokemon && gameState.stage !== GameStage.FIGHT) return;
    if(currentPokemonInfoDisplayed != null) hidePokemonInfo();
    currentPokemonInfoDisplayed = pokemon

    pokemonInfoBox = scene.add.group();

    const isOnPlayerSide = pokemon instanceof PokemonOnBoard && pokemon.y < 4

    let oy = isOnPlayerSide ? game.scale.height - 42 : 42;
    let ox = isOnPlayerSide ? game.scale.width / 2 + 20 : game.scale.width / 2

    const pokemonInfoBoxBackground = scene.add.nineslice(
        ox, oy,   // this is the starting x/y location
        280, 84,   // the width and height of your object
        'box1', // a key to an already loaded image
        8,         // the width and height to offset for a corner slice
    ).setOrigin(0.5,0.5).setScrollFactor(0);
    pokemonInfoBox.add(pokemonInfoBoxBackground)

    let name = pokemon.entry.name
    if(pokemon instanceof PokemonOnBoard && pokemon.entry === METAMORPH) name = METAMORPH.name
    const pokemonNameText = addText(ox - 50, oy - 28,`${name} Lv${pokemon.level}`)
    pokemonInfoBox.add(pokemonNameText)

    const portrait = scene.add.sprite(ox-92, oy-1, "pokemon_portraits")
    portrait.play(`${pokemon.entry.ref}_portrait`)
    portrait.setScrollFactor(0);
    pokemonInfoBox.add(portrait)

    const hpText = addText(ox-50, oy-12, "HP")
    pokemonInfoBox.add(hpText)
    const hpValueText = addText(ox+48, oy-12, `${Math.ceil(pokemon.pv).toString().padStart(3)} / ${pokemon.maxPV}`)
    pokemonInfoBox.add(hpValueText)

    const BAR_WIDTH = 72;
    const bars = scene.add.graphics()
    bars.setDepth(Z.MENU_OBJECTS).setScrollFactor(0);
    bars.fillStyle(0x000000).fillRoundedRect(ox-30, oy-8, BAR_WIDTH+2, 6, 4)
    bars.fillStyle(0xD0D0A0, 1).fillRoundedRect(ox-29, oy-7, BAR_WIDTH, 4, 2)
    bars.fillStyle(0x00BB00).fillRoundedRect(ox-29, oy-7, Math.ceil(BAR_WIDTH * pokemon.pv / pokemon.maxPV), 4, 2)

    const ppText = addText(ox-50, oy-1, "PP")
    pokemonInfoBox.add(ppText)
    const ppValueText = addText(ox+48, oy-1, `${Math.floor(pokemon.pp).toString().padStart(3)} / ${pokemon.entry.maxPP}`)
    pokemonInfoBox.add(ppValueText)

    bars.fillStyle(0x000000).fillRoundedRect(ox-30, oy+2, BAR_WIDTH+2, 6, 4)
    bars.fillStyle(0xD0D0A0, 1).fillRoundedRect(ox-29, oy+3, BAR_WIDTH, 4, 2)
    bars.fillStyle(0x0000FF, 1).fillRoundedRect(ox-29, oy+3, Math.ceil(BAR_WIDTH * pokemon.pp / pokemon.entry.maxPP), 4, 2)
    pokemonInfoBox.add(bars)

    const statAttackIcon = scene.add.sprite(ox-50, oy+14, "icons16x16", 16)
    statAttackIcon.setAlpha(0.25).setOrigin(0,0).setScrollFactor(0);
    pokemonInfoBox.add(statAttackIcon)
    const statAttackText = addText(ox - 30, oy+15, pokemon.attack.toFixed(0))
    pokemonInfoBox.add(statAttackText)

    const statDefenseIcon = scene.add.sprite(ox-2, oy+14, "icons16x16", 17)
    statDefenseIcon.setAlpha(0.25).setOrigin(0,0).setScrollFactor(0);
    pokemonInfoBox.add(statDefenseIcon)
    const statDefenseText = addText(ox + 18, oy+15, pokemon.defense.toFixed(0))
    pokemonInfoBox.add(statDefenseText)

    const statSpeedIcon = scene.add.sprite(ox+46, oy+14, "icons16x16", 18)
    statSpeedIcon.setAlpha(0.25).setOrigin(0,0).setScrollFactor(0);
    pokemonInfoBox.add(statSpeedIcon)
    const statSpeedText = addText(ox+66, oy+15, pokemon.speed.toFixed(0))
    pokemonInfoBox.add(statSpeedText)

    const statRangeIcon = scene.add.sprite(ox+94, oy+14, "icons16x16", 19)
    statRangeIcon.setAlpha(0.25).setOrigin(0,0).setScrollFactor(0);
    pokemonInfoBox.add(statRangeIcon)
    const statRangeText = addText(ox +114, oy+15, pokemon.entry.baseSkill.attackRange.toFixed(0))
    pokemonInfoBox.add(statRangeText)

    for(let i=0; i< pokemon.types.length; i++) {
        const typeSprite = scene.add.sprite(ox + 112 - i*20, oy-22, "icons16x16", pokemon.types[i].frameIndex)
        typeSprite.setScrollFactor(0);
        pokemonInfoBox.add(typeSprite)
    }

    pokemonInfoBox.setDepth(Z.MENU)
}

export function hidePokemonInfo(){
    if(!pokemonInfoBox) return;
    pokemonInfoBox.destroy(true)
    pokemonInfoBox = null;
    currentPokemonInfoDisplayed = null
}

export function getCurrentPokemonInfoDisplayed(){
    return currentPokemonInfoDisplayed
}

export function updatePokemonInfoBox(){
    if(currentPokemonInfoDisplayed){
        displayPokemonInfo(currentPokemonInfoDisplayed)
    }
}