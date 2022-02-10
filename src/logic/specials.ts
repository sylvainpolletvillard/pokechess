import Phaser from "phaser";
import {AlterationType} from "../data/alterations";
import {Z} from "../data/depths";
import {EFFECTS} from "../data/effects";
import {POKEMONS} from "../data/pokemons";
import {SKILLS} from "../data/skills";
import {PokemonOnBoard} from "../objects/pokemon";
import GameScene from "../scenes/GameScene";
import {pickRandomIn, randomInt, wait} from "../utils/helpers";
import {addAlteration} from "./alteration";
import {getPokemonOnTile, getPositionFromCoords} from "./board";
import {applyDamage, calcDamage} from "./fight";
import {gameState} from "./gamestate";
import {distanceBetweenPokemon} from "./pathfinding";
import {triggerSkill} from "./skill-anims";
import {Skill} from "./skill";
import {OWNER_PLAYER} from "../data/owners";

export function triggerSpecial(specialMoveName: string, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    switch(specialMoveName){
        case "teleport": return teleport(attacker)
        case "eclair": return renderEclair(attacker, game)
        case "provoc": return provoc(attacker, game)
        case "encore": return encore(attacker, target, game)
        case "metronome": return metronome(attacker, target, game)
        case "e-coque": return eCoque(attacker, game)
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
        //console.log(`Eclair sur ${randomTarget.name} ; ${randomTarget.name} receives ${damage} damage !`)
        applyDamage(damage, randomTarget)
        addAlteration(randomTarget, { type: AlterationType.PARALYSIE, stacks: 50 }, game)
    }
}

export function provoc(attacker: PokemonOnBoard, game: GameScene){
    const pokemonsProvocated = gameState.board.otherTeam.filter(p => distanceBetweenPokemon(attacker, p) <= Math.sqrt(8))
    //console.log("PROVOC", { pokemonsProvocated })
    pokemonsProvocated.forEach(pokemon => {
        const provocatedSprite = game.add.sprite(pokemon.x+8, pokemon.y, "effects")
        provocatedSprite.scale = EFFECTS.PROVOCATED.scale ?? 1;
        provocatedSprite.blendMode = Phaser.BlendModes.OVERLAY
        provocatedSprite.setDepth(Z.SKILL_EFFECT_ABOVE_POKEMON)
        provocatedSprite.play(EFFECTS.PROVOCATED.key)
        wait(500).then(() => provocatedSprite.destroy())
        if(pokemon.nextAction.timer){
            wait(pokemon.nextAction.timer.getRemaining()).then(() => {
                pokemon.resetTarget(attacker)
            })            
        } else {
            pokemon.resetTarget(attacker)
        }
        
    })
}

let lastSkillSeen: Skill = SKILLS.TREMPETTE;
export function recordLastSkillSeen(skill: Skill){
    if(skill !== SKILLS.ENCORE) lastSkillSeen = skill
}

export function encore(attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    console.log("Encore: "+lastSkillSeen.name)
    return wait(500).then(() => triggerSkill(lastSkillSeen, attacker, target, game))
}


const PP_SKILLS = Object.values(SKILLS)
    .filter(skill => POKEMONS.some(p => p.ppSkill === skill))

export function metronome(attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    const randomSkill = pickRandomIn(PP_SKILLS)
    lastSkillSeen = randomSkill
    console.log("Metronome: "+randomSkill.name)
    return triggerSkill(randomSkill, attacker, target, game)
}

export function eCoque(attacker: PokemonOnBoard, game: GameScene){
    const team = attacker.owner === OWNER_PLAYER ? gameState.board.playerTeam : gameState.board.otherTeam
    team.forEach(pokemon => addAlteration(pokemon, { type: AlterationType.SOIN, stacks: 60 }, game))
}