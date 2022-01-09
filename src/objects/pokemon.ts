import {Pokemon, PokemonAction, PokemonTypeAction} from "../data/pokemons";
import Game from "../scenes/GameScene";
import {addInteractiveElem, dragState, handleDragStart, testIfCanBeDragged} from "./cursor";
import {wait} from "../utils/helpers";
import {capturePokemon, getPositionFromCoords} from "../logic/board";
import {Direction} from "../utils/directions";
import {removeFromBox} from "../logic/box";
import {gameState} from "../logic/gamestate";
import {getCurrentPokemonCaptureInfoDisplayed} from "./pokemonCaptureBox";
import {canAfford} from "../logic/shop";
import { displayPokemonReleaseBox, hidePokemonReleaseInfo } from "./pokemonReleaseBox";
import { hidePokemonInfo } from "./pokemonInfoBox";
import { Alteration } from "../data/alterations";
import { Z } from "../data/depths";

export class PokemonOnBoard extends Pokemon {
    x:number;
    y:number;
    placementX: number;
    placementY: number;
    facingDirection: Direction;
    nextAction: PokemonAction;
    alterations: Alteration[];

    constructor(pokemon: Pokemon, x:number, y:number) {
        super(pokemon, pokemon.owner, pokemon.level);
        this.x = x
        this.y = y
        this.placementX = x
        this.placementY = y
        this.facingDirection = this.owner === 1 ? Direction.UP : Direction.DOWN
        this.nextAction = { type: PokemonTypeAction.IDLE }
        this.pv = this.maxPV
        this.pp = 0
        this.alterations = []
    }

    reset(): PokemonOnBoard {
        this.x = this.placementX
        this.y = this.placementY
        this.facingDirection = this.owner === 1 ? Direction.UP : Direction.DOWN
        this.nextAction = { type: PokemonTypeAction.IDLE }
        this.pv = this.maxPV
        this.pp = 0
        return this
    }

    get position(){
        return getPositionFromCoords(this.x, this.y)
    }

    get positionPlacement(){
        return getPositionFromCoords(this.placementX, this.placementY)
    }

    toBoxPokemon(game: Game){
        const pokemon = new Pokemon(this, this.owner, this.level)
        game.sprites.get(pokemon.uid)?.setData("pokemon", pokemon);
        pokemon.owner = 1
        return pokemon
    }
}

export function makePokemonSprite(
    pokemon: Pokemon,
    game: Game
): Phaser.GameObjects.Sprite {
    const [x,y] = pokemon instanceof PokemonOnBoard ? pokemon.positionPlacement : [0,0];
    const sprite = game.add.sprite(x, y, "pokemon")
    game.sprites.set(pokemon.uid, sprite)
    game.graphics.set(pokemon.uid, game.add.graphics()) // hp bar
    sprite.setData("pokemon", pokemon)
    sprite.setData("type", "pokemon")
    sprite.play(`${pokemon.ref}_DOWN`)
    sprite.setDepth(Z.POKEMON)
    sprite.anims.pause()
    sprite.setInteractive()
    game.input.setDraggable(sprite);
    addInteractiveElem(sprite)

    sprite.on('click', () => {
        if(dragState.draggedElem === null && testIfCanBeDragged(sprite)){
            wait(50).then(() => handleDragStart(sprite, game))
        }
        if(getCurrentPokemonCaptureInfoDisplayed() === pokemon
            && pokemon instanceof PokemonOnBoard
            && canAfford(pokemon.cost)
            && !gameState.player.hasBoxFull){
            capturePokemon(pokemon, sprite, game)
        }
    })

    sprite.on('dragstart', () => {
        const pokemon = sprite.getData("pokemon")
        if(pokemon.owner !== 1) return;
        sprite.anims.resume()
        sprite.setAlpha(1)
        hidePokemonInfo();
        displayPokemonReleaseBox(pokemon);

        if(gameState.player.box.includes(pokemon)){
            removeFromBox(pokemon)
        }
    })

    sprite.on('drop', (pointer: PointerEvent) => {
        sprite.anims.pause(sprite.anims.currentAnim.getFrameByProgress(0))
        sprite.setAlpha(0.5)
        hidePokemonReleaseInfo();
    })
    
    return sprite;
}