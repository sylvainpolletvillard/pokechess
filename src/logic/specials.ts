import Phaser from "phaser";
import {AlterationType} from "../data/alterations";
import {Z} from "../data/depths";
import {EFFECTS} from "../data/effects";
import {POKEMONS} from "../data/pokemons";
import {SKILLS} from "../data/skills";
import {PokemonOnBoard} from "../objects/pokemon";
import GameScene from "../scenes/GameScene";
import {pickRandomIn, randomInt, wait} from "../utils/helpers";
import {addAlteration, removeAlteration} from "./alteration";
import {getCoordsFromPosition, getPokemonOnTile, getPositionFromCoords} from "./board";
import {applyDamage, calcDamage} from "./fight";
import {gameState} from "./gamestate";
import {distanceBetweenPokemon} from "./pathfinding";
import {makeEffectSprite, triggerSkill} from "./skill-anims";
import {Skill} from "./skill";
import {OWNER_PLAYER} from "../data/owners";
import {Direction, getDeltaFromDirection, getDirectionFromDelta, getRotationAngle} from "../utils/directions";
import {drawPokeballsCounter} from "../objects/pokeballsCounter";
import {MyScene} from "../scenes/MyScene";

export function triggerSpecial(specialMoveName: string, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    switch(specialMoveName){
        case "teleport": return teleport(attacker)
        case "eclair": return renderEclair(attacker, game)
        case "provoc": return provoc(attacker, game)
        case "encore": return encore(attacker, target, game)
        case "metronome": return metronome(attacker, target, game)
        case "e-coque": return eCoque(attacker, game)
        case "amnesie": return amnesie(attacker)
        case "ultralaser": return renderUltralaser(attacker, target, game)
        case "laser_glace": return renderLaserGlace(attacker, target, game)
        case "jackpot": return jackpot(attacker, game)
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
    const sprite = makeEffectSprite(EFFECTS.TELEPORT, sceneX, sceneY, game)
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
        makeEffectSprite(EFFECTS.ECLAIR, x, y, game)
        y -= 32
    }

    const damage = calcDamage(SKILLS.ECLAIR, randomTarget, attacker)
    //console.log(`Eclair sur ${randomTarget.name} ; ${randomTarget.name} receives ${damage} damage !`)
    applyDamage(damage, randomTarget)
    addAlteration(randomTarget, { type: AlterationType.PARALYSIE, stacks: 50 }, game)
}

export function provoc(attacker: PokemonOnBoard, game: GameScene){
    const pokemonsProvocated = gameState.board.otherTeam.filter(p => distanceBetweenPokemon(attacker, p) <= Math.sqrt(8))
    //console.log("PROVOC", { pokemonsProvocated })
    pokemonsProvocated.forEach(pokemon => {
        const provocatedSprite = makeEffectSprite(EFFECTS.PROVOCARED, pokemon.x+8, pokemon.y, game)
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

export function amnesie(pokemon: PokemonOnBoard){
    pokemon.alterations.forEach(alt => removeAlteration(pokemon, alt))
}

export function renderUltralaser(attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    const direction = getDirectionFromDelta(target.x - attacker.x, target.y - attacker.y) ?? Direction.UP
    let [x, y] = attacker.position;
    let [dx,dy]  = getDeltaFromDirection(direction)
    x+= dx*16; y+=dy*16
    let part=0;

    while(y >= 0 && y <= game.scale.height && x >= 0 && x <= game.scale.width){
        const sprite = makeEffectSprite(part === 0 ? EFFECTS.ULTRALASER_START : EFFECTS.ULTRALASER_BEAM, x, y, game)
        sprite.setRotation(getRotationAngle(direction))

        const [i,j] = getCoordsFromPosition(x,y)
        const pokemonOnTile = getPokemonOnTile(i, j)
        if(pokemonOnTile && pokemonOnTile.owner !== attacker.owner) {
            const damage = calcDamage(SKILLS.ULTRALASER, pokemonOnTile, attacker)
            console.log(`Ultralaser sur ${pokemonOnTile.name} ; ${pokemonOnTile.name} receives ${damage} damage !`)
            applyDamage(damage, pokemonOnTile)
        }

        y += dy*32
        x += dx*32
        part++
    }
}


export function renderLaserGlace(attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    const direction = getDirectionFromDelta(target.x - attacker.x, target.y - attacker.y) ?? Direction.UP
    let [x, y] = attacker.position;
    let [dx,dy]  = getDeltaFromDirection(direction)
    x+= dx*16; y+=dy*16
    let part=0;

    while(y >= 0 && y <= game.scale.height && x >= 0 && x <= game.scale.width){
        const sprite = makeEffectSprite(part === 0 ? EFFECTS.LASER_GLACE_START : EFFECTS.LASER_GLACE_BEAM, x, y, game)
        sprite.setRotation(getRotationAngle(direction))

        const [i,j] = getCoordsFromPosition(x,y)
        const pokemonOnTile = getPokemonOnTile(i, j)
        if(pokemonOnTile && pokemonOnTile.owner !== attacker.owner) {
            const damage = calcDamage(SKILLS.LASER_GLACE, pokemonOnTile, attacker)
            console.log(`Laser glace sur ${pokemonOnTile.name} ; ${pokemonOnTile.name} receives ${damage} damage !`)
            applyDamage(damage, pokemonOnTile)
            addAlteration(pokemonOnTile, { type: AlterationType.GEL, stacks: 50 }, game)
        }

        y += dy*32
        x += dx*32
        part++
    }
}

export function jackpot(attacker: PokemonOnBoard, game: GameScene){
    const coinFlip = Math.random() < 1/2
    const [x, y] = attacker.position;
    makeEffectSprite(coinFlip ? EFFECTS.JACKPOT_WIN : EFFECTS.JACKPOT_LOSE, x, y-24, game);

    if(coinFlip){
        gameState.player.inventory.pokeball += 1
        drawPokeballsCounter(gameState.activeScene as MyScene)
    }
}