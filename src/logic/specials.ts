import Phaser from "phaser";
import {AlterationType} from "../data/alterations";
import {EFFECTS} from "../data/effects";
import {POKEMONS} from "../data/pokemons";
import {SKILLS} from "../data/skills";
import {makePokemonSprite, movePokemonSprite, PokemonOnBoard, removePokemonSprite} from "../objects/pokemon";
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
import {
    TYPE_COMBAT,
    TYPE_DRAGON,
    TYPE_EAU,
    TYPE_ELECTRIQUE,
    TYPE_FEE,
    TYPE_FEU,
    TYPE_GLACE,
    TYPE_INSECTE,
    TYPE_NORMAL,
    TYPE_PLANTE,
    TYPE_POISON,
    TYPE_PSY,
    TYPE_ROCHE,
    TYPE_SOL,
    TYPE_SPECTRE,
    TYPE_VOL
} from "../data/types";
import {PYROLI} from "../data/pokemons/pyroli";
import {AQUALI} from "../data/pokemons/aquali";
import {VOLTALI} from "../data/pokemons/voltali";

export function triggerSpecial(specialMoveName: string, attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    switch(specialMoveName){
        case "teleport": return teleport(attacker, game)
        case "tunnel": return tunnel(attacker, target, game)
        case "eclair": return eclair(attacker, game)
        case "provoc": return provoc(attacker, game)
        case "encore": return encore(attacker, target, game)
        case "metronome": return metronome(attacker, target, game)
        case "e-coque": return eCoque(attacker, game)
        case "amnesie": return amnesie(attacker)
        case "ultralaser": return renderUltralaser(attacker, target, game)
        case "laser_glace": return renderLaserGlace(attacker, target, game)
        case "jackpot": return jackpot(attacker, game)
        case "morphing": return morphing(attacker, target, game)
        case "evolution": return evolution(attacker, target, game)
        case "psyko": return psyko(attacker, game)
        case "deflagration": return deflagration(attacker, game)
        case "blizzard": return blizzard(attacker, game)
        case "fatal_foudre": return fatalFoudre(attacker, game)
    }
}

export function teleport(pokemon: PokemonOnBoard, game: GameScene){
    let { x: originX, y: originY } = pokemon
    let x: number , y: number;
    do { // find random empty tile
        x = randomInt(0, 6)
        y = randomInt(0, 7)
    } while (x === originX || y === originY || getPokemonOnTile(x,y) != null)

    pokemon.makeUntargettable(150)

    const [sceneX, sceneY] = getPositionFromCoords(x,y);
    const sprite = makeEffectSprite(EFFECTS.TELEPORT, sceneX, sceneY, game)
    sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        sprite.destroy()
        movePokemonSprite(pokemon, x, y, game)
    })
}

export function tunnel(pokemon: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    let { x: originX, y: originY } = pokemon
    let x: number , y: number;
    do { // find random empty tile
        x = randomInt(0, 6)
        y = randomInt(0, 7)
    } while (x === originX || y === originY || getPokemonOnTile(x,y) != null)

    const pokemonSprite = game.sprites.get(pokemon.uid) as Phaser.GameObjects.Sprite;
    game.tweens.add({ targets: pokemonSprite, scale: 0, duration: 250, easing: "Linear" })

    wait(150).then(() => pokemon.makeUntargettable(850))

    wait(450).then(() => {
        const targetSprite = game.sprites.get(target.uid) as Phaser.GameObjects.Sprite;
        if(targetSprite) makeEffectSprite(EFFECTS.TUNNEL, targetSprite.x, targetSprite.y + 8, game)
    })

    wait(850).then(() => {
        if(pokemon.pv <= 0) return // too late im dead
        const [sceneX, sceneY] = getPositionFromCoords(x,y);
        makeEffectSprite(EFFECTS.TUNNEL, sceneX, sceneY, game)
        movePokemonSprite(pokemon, x, y, game)
        game.tweens.add({ targets: pokemonSprite, scale: 1, duration: 250, easing: "Linear" })
    })
}

export function eclair(attacker: PokemonOnBoard, game: GameScene) {
    const randomTarget = pickRandomIn(gameState.board.otherTeam)
    let [x, y] = randomTarget.position;
    return renderEclair(attacker, x, y, game)
}

export function renderEclair(attacker: PokemonOnBoard,x: number, y: number, game: GameScene){
    y-= 16;
    while(y >= 0){
        makeEffectSprite(EFFECTS.ECLAIR, x, y, game)
        y -= 32
    }

    const [i,j] = getCoordsFromPosition(x,y)
    const pokemonOnTile = getPokemonOnTile(i,j)
    if(pokemonOnTile){
        const damage = calcDamage(SKILLS.ECLAIR, pokemonOnTile, attacker)
        console.log(`Eclair sur ${pokemonOnTile.entry.name} ; ${pokemonOnTile.entry.name} receives ${damage} damage !`)
        applyDamage(damage, pokemonOnTile)
        addAlteration(pokemonOnTile, { type: AlterationType.PARALYSIE, stacks: 50 }, game)
    }
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
            console.log(`Ultralaser sur ${pokemonOnTile.entry.name} ; ${pokemonOnTile.entry.name} receives ${damage} damage !`)
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
            console.log(`Laser glace sur ${pokemonOnTile.entry.name} ; ${pokemonOnTile.entry.name} receives ${damage} damage !`)
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

export function morphing(attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    attacker.initialEntry = attacker.entry
    attacker.entry = target.entry
    removePokemonSprite(attacker, game)
    const newSprite = makePokemonSprite(attacker, game)
    newSprite.play(`${attacker.entry.ref}_${attacker.facingDirection}`)
    game.sprites.set(attacker.uid, newSprite)
}

export function evolution(attacker: PokemonOnBoard, target: PokemonOnBoard, game: GameScene){
    attacker.initialEntry = attacker.entry
        // aquali voltali pyroli
        const EVOLI_MAPPING = new Map([
            [TYPE_COMBAT, AQUALI],
            [TYPE_DRAGON, VOLTALI],
            [TYPE_EAU, VOLTALI],
            [TYPE_ELECTRIQUE, PYROLI],
            [TYPE_FEE, VOLTALI],
            [TYPE_FEU, AQUALI],
            [TYPE_GLACE, PYROLI],
            [TYPE_INSECTE, PYROLI],
            [TYPE_NORMAL, VOLTALI],
            [TYPE_PLANTE, PYROLI],
            [TYPE_POISON, VOLTALI],
            [TYPE_PSY, AQUALI],
            [TYPE_ROCHE, AQUALI],
            [TYPE_SOL, AQUALI],
            [TYPE_SPECTRE, PYROLI],
            [TYPE_VOL, VOLTALI]
        ])

    attacker.entry = EVOLI_MAPPING.get(target.entry.types[0]) ?? PYROLI
    removePokemonSprite(attacker, game)
    const newSprite = makePokemonSprite(attacker, game)
    newSprite.play(`${attacker.entry.ref}_${attacker.facingDirection}`)
    game.sprites.set(attacker.uid, newSprite)
}

export function psyko(attacker: PokemonOnBoard, game: GameScene){
    const otherTeam = attacker.owner === OWNER_PLAYER ? gameState.board.otherTeam : gameState.board.playerTeam
    otherTeam.forEach(target => {
        game.cameras.main.flash(250, 255, 0, 255)
        addAlteration(target, { type: AlterationType.CONFUSION, stacks: 40 }, game)
        wait(SKILLS.PSYKO.hitDelay).then(() => {
            const damage = calcDamage(SKILLS.PSYKO, target, attacker)
            console.log(`Psyko sur ${target.entry.name} ; ${target.entry.name} receives ${damage} damage !`)
            applyDamage(damage, target)
        })
    })
}

export function deflagration(attacker: PokemonOnBoard, game: GameScene){
    const otherTeam = attacker.owner === OWNER_PLAYER ? gameState.board.otherTeam : gameState.board.playerTeam
    otherTeam.forEach(target => {
        addAlteration(target, { type: AlterationType.BRULURE, stacks: 60 }, game)
    })
    const NUMBER_ERUPTIONS = 8
    const eruptionsCoords: [number, number][] = []
    while(eruptionsCoords.length < NUMBER_ERUPTIONS){
        let randomX = randomInt(0, 6)
        let randomY = randomInt(0, 7)
        if(!eruptionsCoords.some(([x,y]) => x === randomX && y === randomY)){
            eruptionsCoords.push([randomX, randomY])
        }
    }

    game.cameras.main.flash(250, 255, 0, 0)
    eruptionsCoords.reduce((promise: Promise<void>, [i,j], ) => {
        let [x,y] = getPositionFromCoords(i,j)
        makeEffectSprite(EFFECTS.ERUPTION, x, y, game)
        return promise
            .then(() => wait(SKILLS.DEFLAGRATION.hitDelay))
            .then(() => {
                const pokemonOnTile = getPokemonOnTile(i,j)
                if(pokemonOnTile){
                    const damage = calcDamage(SKILLS.DEFLAGRATION, pokemonOnTile, attacker)
                    console.log(`Eruption sur ${pokemonOnTile.entry.name} ; ${pokemonOnTile.entry.name} receives ${damage} damage !`)
                    applyDamage(damage, pokemonOnTile)
                }
            })
    }, wait(10))

}

export function blizzard(attacker: PokemonOnBoard, game: GameScene){
    const otherTeam = attacker.owner === OWNER_PLAYER ? gameState.board.otherTeam : gameState.board.playerTeam
    otherTeam.forEach(target => {
        addAlteration(target, { type: AlterationType.GEL, stacks: 40 }, game)
    })
    const NUMBER_GRELONS = 8
    const grelonsCoords: [number, number][] = []
    while(grelonsCoords.length < NUMBER_GRELONS){
        let randomX = randomInt(0, 6)
        let randomY = randomInt(0, 7)
        if(!grelonsCoords.some(([x,y]) => x === randomX && y === randomY)){
            grelonsCoords.push([randomX, randomY])
        }
    }

    game.cameras.main.flash(250, 64, 128, 255)
    return grelonsCoords.reduce((promise: Promise<void>, [i,j], ) => {
        let [x,y] = getPositionFromCoords(i,j)
        makeEffectSprite(EFFECTS.ECLATS_GLACE, x, y, game)
        return promise
            .then(() => wait(SKILLS.BLIZZARD.hitDelay))
            .then(() => {
                const pokemonOnTile = getPokemonOnTile(i,j)
                if(pokemonOnTile){
                    const damage = calcDamage(SKILLS.BLIZZARD, pokemonOnTile, attacker)
                    console.log(`Eclat glace sur ${pokemonOnTile.entry.name} ; ${pokemonOnTile.entry.name} receives ${damage} damage !`)
                    applyDamage(damage, pokemonOnTile)
                }
            })
    }, wait(10))

}

export function fatalFoudre(attacker: PokemonOnBoard, game: GameScene){
    const otherTeam = attacker.owner === OWNER_PLAYER ? gameState.board.otherTeam : gameState.board.playerTeam
    otherTeam.forEach(target => {
        addAlteration(target, { type: AlterationType.PARALYSIE, stacks: 40 }, game)
    })
    const NUMBER_ECLAIRS = 8
    const eclairsCoords: [number, number][] = []
    while(eclairsCoords.length < NUMBER_ECLAIRS){
        let randomX = randomInt(0, 6)
        let randomY = randomInt(0, 7)
        if(!eclairsCoords.some(([x,y]) => x === randomX && y === randomY)){
            eclairsCoords.push([randomX, randomY])
        }
    }

    game.cameras.main.flash(250, 255, 255, 192)
    return eclairsCoords.reduce((promise: Promise<void>, [i,j], ) => {
        let [x,y] = getPositionFromCoords(i,j)
        return promise
            .then(() => renderEclair(attacker, x, y, game))
            .then(() => wait(SKILLS.FATAL_FOUDRE.hitDelay))

    }, wait(10))
}