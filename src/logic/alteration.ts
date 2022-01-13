import { AlterationType, Alteration } from "../data/alterations"
import { EFFECTS } from "../data/effects"
import { POKEMON_TYPES } from "../data/types"
import { PokemonOnBoard } from "../objects/pokemon"
import GameScene from "../scenes/GameScene"
import { Direction } from "../utils/directions"
import { removeInArray } from "../utils/helpers"
import { applyDamage } from "./fight"
import { gameState } from "./gamestate"

export function updateAlterations(pokemons: PokemonOnBoard[]){
    pokemons.forEach((pokemon: PokemonOnBoard) => {
        pokemon.alterations.forEach(alt => {
            applyAlterationEffect(pokemon, alt)
            alt.stacks--;            
            if(alt.stacks <= 0){
                removeAlteration(pokemon, alt)                
            } else if(alt.effectSprite){                
                alt.effectSprite.setPosition(...pokemon.position)
            }
        })
    })
}

export function applyAlterationEffect(pokemon: PokemonOnBoard, alteration: Alteration){
    const game = gameState.activeScene as GameScene;
    const sprite = game.sprites.get(pokemon.uid)
    if(alteration.type === AlterationType.MAELSTROM){
        switch(pokemon.facingDirection){
            case Direction.UP: pokemon.facingDirection = Direction.RIGHT; break;
            case Direction.RIGHT: pokemon.facingDirection = Direction.DOWN; break;
            case Direction.DOWN: pokemon.facingDirection = Direction.LEFT; break;
            case Direction.LEFT: default: pokemon.facingDirection = Direction.UP; break;
        }

        sprite?.play(`${pokemon.ref}_${pokemon.facingDirection}`)
    } else if(alteration.type === AlterationType.POISON){
        let poisonDamage = Math.floor(Math.min(500, alteration.stacks) / 10000) * pokemon.maxPV
        if(pokemon.types.includes(POKEMON_TYPES.POISON)){
            poisonDamage = Math.floor(poisonDamage * 0.5) 
            // type poison = 50% résistance au poison //TODO: bonus alliance à prendre en compte
        } 
        applyDamage(poisonDamage, pokemon, true)
    } else if(alteration.type === AlterationType.BRULURE){
        const burnDamage = 0.1 * (game.gameSpeed / 1000) * pokemon.level; // 0.1 HP per second per level
        applyDamage(burnDamage, pokemon, true)
    } else if(alteration.type === AlterationType.SOMMEIL){
        sprite?.anims.pause()
    } else if(alteration.type === AlterationType.LIGOTAGE){
        let damage = pokemon.maxPV * (2/100) * (game.gameSpeed / 1000) // 2% HP max per second
        console.log("damage ligotage", damage)
        applyDamage(damage, pokemon, true)
    }
}

export function hasBlockingAlteration(pokemon: PokemonOnBoard){
    return pokemon.alterations.some(alt => [
        AlterationType.MAELSTROM, 
        AlterationType.SOMMEIL   
    ].includes(alt.type))
}

export function canPokemonBeTargeted(pokemon: PokemonOnBoard){
    return !pokemon.alterations.some(alt => alt.type === AlterationType.MAELSTROM)
}

export function addAlteration(pokemon: PokemonOnBoard, alteration: Alteration, game: GameScene){    
    const alterationToStack = pokemon.alterations.find(alt => alt.type === alteration.type)
    if(alterationToStack){        
        alterationToStack.stacks += alteration.stacks
        //console.log(`More stacks of ${alteration.type} on ${pokemon.name} (stacks: ${alterationToStack.stacks})`)
    } 
    else {
        console.log(`Apply ${alteration.type} on ${pokemon.name} (stacks: ${alteration.stacks})`)
        const targetSprite = game.sprites.get(pokemon.uid)
        if(!targetSprite) return console.error(`Error, can't find pokemon sprite uid ${pokemon.uid}`)

        if(alteration.type === AlterationType.MAELSTROM){
            sendPokemonFlying(pokemon, game)
        } 
        if(alteration.type === AlterationType.BRULURE){
            alteration.effectSprite = game.add.sprite(targetSprite.x, targetSprite.y, "effects").play(EFFECTS.BURN.key)
                .setAlpha(0)
                .setScale(EFFECTS.BURN.scale ?? 1)
            game.tweens.add({ targets: alteration.effectSprite, alpha: 0.35, duration: 250, easing: "Linear" })
        }
        if(alteration.type === AlterationType.SOMMEIL){
            alteration.effectSprite = game.add.sprite(targetSprite.x, targetSprite.y, "effects").play(EFFECTS.SOMMEIL.key)                
                .setScale(EFFECTS.SOMMEIL.scale ?? 1)            
        }

        pokemon.alterations.push({ ...alteration })
    }
}

export function removeAlteration(pokemon: PokemonOnBoard, alt: Alteration){
    removeInArray(pokemon.alterations, alt)
    if(alt.effectSprite) alt.effectSprite.destroy()

    if(alt.type === AlterationType.SOMMEIL){
        const game = gameState.activeScene as GameScene
        const sprite = game.sprites.get(pokemon.uid)
        sprite?.anims.resume()
    }
}

export function sendPokemonFlying(pokemon: PokemonOnBoard, game: GameScene){
    const targetSprite = game.sprites.get(pokemon.uid)
    if(!targetSprite) return;
    let {x, y} = targetSprite            
    game.tweens.add({
        targets: targetSprite, 
        x: x,
        y: y - 20,
        duration: 1600,
        ease: Phaser.Math.Easing.Bounce.Out,
        onComplete(){
            game.tweens.add({
                targets: targetSprite, 
                x: x,
                y: y,
                duration: 800,
                ease: Phaser.Math.Easing.Bounce.In
            })
        }
    });
}