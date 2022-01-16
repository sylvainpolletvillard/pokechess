import Phaser from "phaser";
import { AlterationType } from "../data/alterations";
import { Z } from "../data/depths";
import { EFFECTS } from "../data/effects";
import { SKILLS } from "../data/skills";
import { PokemonOnBoard } from "../objects/pokemon";
import GameScene from "../scenes/GameScene";
import { pickRandomIn, randomInt } from "../utils/helpers";
import { addAlteration } from "./alteration";
import { getPokemonOnTile, getPositionFromCoords } from "./board";
import { applyDamage, calcDamage } from "./fight";
import { gameState } from "./gamestate";

export function triggerSpecial(specialMoveName: string, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    switch(specialMoveName){
        case "teleport": return teleport(attacker)
        case "eclair": return renderEclair(attacker, game) 
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
    sprite.play(EFFECTS.TELEPORT.key)
    sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        sprite.destroy()
        pokemon.x = x
        pokemon.y = y
        game.sprites.get(pokemon.uid)?.setPosition(sceneX, sceneY)
    })
}

export function renderEclair(attacker: PokemonOnBoard, game: GameScene){
    const randomTarget = pickRandomIn(gameState.board.otherTeam)    

    let [x, y] = randomTarget.position;
    y-= 16;
    while(y >= 0){
        const sprite = game.add.sprite(x, y, "effects")
        sprite.scale = 1;
        sprite.blendMode = Phaser.BlendModes.OVERLAY
        sprite.setDepth( Z.SKILL_EFFECT_ABOVE_POKEMON)
        sprite.play(EFFECTS.ECLAIR.key)
        sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => sprite.destroy())
        y -= 32

        const damage = calcDamage(SKILLS.ECLAIR, randomTarget, attacker)
        console.log(`Eclair sur ${randomTarget.name} ; ${randomTarget.name} receives ${damage} damage !`)
        applyDamage(damage, randomTarget)
        addAlteration(randomTarget, { type: AlterationType.PARALYSIE, stacks: 50 }, game)
    }
}