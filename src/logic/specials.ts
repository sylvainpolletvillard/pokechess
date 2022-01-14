import { Z } from "../data/depths";
import { EFFECTS } from "../data/effects";
import { PokemonOnBoard } from "../objects/pokemon";
import GameScene from "../scenes/GameScene";
import { randomInt } from "../utils/helpers";
import { getPokemonOnTile, getPositionFromCoords } from "./board";
import { gameState } from "./gamestate";

export function triggerSpecial(specialMoveName: string, pokemon: PokemonOnBoard){
    switch(specialMoveName){
        case "teleport": return teleport(pokemon)
    }
}

export function teleport(pokemon: PokemonOnBoard){
    const game = gameState.activeScene as GameScene;
    let { x: originX, y: originY } = pokemon
    let x: number , y: number;
    do { // find random empty tile
        x = randomInt(0, 6)
        y = randomInt(0, 7)
    } while (x === originX || y === originY || getPokemonOnTile(x,y) != null)    

    const [sceneX, sceneY] = getPositionFromCoords(x,y);
    const sprite = game.add.sprite(sceneX, sceneY, "effects")
    sprite.scale = 1;
    sprite.blendMode = Phaser.BlendModes.OVERLAY
    sprite.setDepth( Z.SKILL_EFFECT_ABOVE_POKEMON)
    sprite.play(EFFECTS.TELEPORT)
    sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        sprite.destroy()
        pokemon.x = x
        pokemon.y = y
        game.sprites.get(pokemon.uid)?.setPosition(sceneX, sceneY)
    })
}