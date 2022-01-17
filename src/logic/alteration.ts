import { AlterationType, Alteration } from "../data/alterations"
import { EFFECTS } from "../data/effects"
import { POKEMON_TYPES } from "../data/types"
import { PokemonOnBoard } from "../objects/pokemon"
import GameScene from "../scenes/GameScene"
import { Direction } from "../utils/directions"
import { removeInArray } from "../utils/helpers"
import { applyDamage, healPokemon } from "./fight"
import { gameState } from "./gamestate"
import { sendPokemonFlying } from "./skill-anims"

export function updateAlterations(pokemons: PokemonOnBoard[]){
    pokemons.forEach((pokemon: PokemonOnBoard) => {
        pokemon.alterations.forEach(alt => {
            applyAlterationEffect(pokemon, alt)
            if(!alt.keepStacks) alt.stacks--;
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
    const perSecond = game.gameSpeed / 1000
    if(alteration.type === AlterationType.HYDROCANON){
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
        const burnDamage = 0.1 * perSecond * pokemon.level; // 0.1 HP per second per level
        applyDamage(burnDamage, pokemon, true)
    } else if(alteration.type === AlterationType.SOMMEIL){
        sprite?.anims.pause()
    } else if(alteration.type === AlterationType.LIGOTAGE){
        let damage = pokemon.maxPV * (2/100) * perSecond // 2% HP max per second        
        applyDamage(damage, pokemon, true)
    } else if(alteration.type === AlterationType.SOIN){
        healPokemon(pokemon, 0.1 * perSecond * pokemon.level)  // 0.1 HP par level par seconde                
    } else if(alteration.type === AlterationType.REPOS){
        healPokemon(pokemon, (5/100) * perSecond * pokemon.maxPV) // 5% max HP par seconde
    }
}

export function hasBlockingAlteration(pokemon: PokemonOnBoard){
    return pokemon.hasAlteration(AlterationType.HYDROCANON)
        || pokemon.hasAlteration(AlterationType.SOMMEIL)
}

export function canPokemonBeTargeted(pokemon: PokemonOnBoard){
    return !pokemon.hasAlteration(AlterationType.HYDROCANON)
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

        switch(alteration.type){
            case AlterationType.HYDROCANON:
                sendPokemonFlying(pokemon, game)
                break;
            
            case AlterationType.BRULURE:
                alteration.effectSprite = game.add.sprite(targetSprite.x, targetSprite.y, "effects").play(EFFECTS.BURN.key)
                    .setAlpha(0)
                    .setScale(EFFECTS.BURN.scale ?? 1)
                game.tweens.add({ targets: alteration.effectSprite, alpha: 0.35, duration: 250, easing: "Linear" })
                break;

            case AlterationType.SOMMEIL:
                alteration.effectSprite = game.add.sprite(targetSprite.x, targetSprite.y, "effects").play(EFFECTS.SOMMEIL.key)                
                    .setScale(EFFECTS.SOMMEIL.scale ?? 1)            
                break;

            case AlterationType.PARALYSIE:
                alteration.effectSprite = game.add.sprite(targetSprite.x, targetSprite.y, "effects").play(EFFECTS.PARALYSIE.key)                
                    .setScale(EFFECTS.PARALYSIE.scale ?? 1)            
                break;       

            case AlterationType.SOIN:
            case AlterationType.REPOS:
                alteration.effectSprite = game.add.sprite(targetSprite.x, targetSprite.y, "effects").play(EFFECTS.SOIN.key)                
                    .setScale(EFFECTS.SOIN.scale ?? 1) 
                break;
        }

        pokemon.alterations.push({ ...alteration })
    }

    if(alteration.type === AlterationType.REPOS){
        addAlteration(pokemon, { type: AlterationType.SOMMEIL, stacks: alteration.stacks }, game)
    }
}

export function removeAlteration(pokemon: PokemonOnBoard, alt: Alteration){
    removeInArray(pokemon.alterations, alt)
    if(alt.effectSprite) alt.effectSprite.destroy()

    if(alt.type === AlterationType.SOMMEIL){
        const game = gameState.activeScene as GameScene
        const sprite = game.sprites.get(pokemon.uid)
        sprite?.anims.resume()
        const repos = pokemon.alterations.find(alt => alt.type === AlterationType.REPOS)
        if(repos) removeAlteration(pokemon, repos)
    }
}