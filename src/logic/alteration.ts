import {Alteration, AlterationType} from "../data/alterations"
import {EFFECTS} from "../data/effects"
import {POKEMON_TYPES} from "../data/types"
import {PokemonOnBoard} from "../objects/pokemon"
import GameScene from "../scenes/GameScene"
import {Direction} from "../utils/directions"
import {removeInArray} from "../utils/helpers"
import {applyDamage, healPokemon, killPokemon} from "./fight"
import {gameState} from "./gamestate"
import {makeEffectSprite, sendPokemonFlying} from "./skill-anims"

export function updateAlterations(pokemons: PokemonOnBoard[]){
    pokemons.forEach((pokemon: PokemonOnBoard) => {
        pokemon.alterations.forEach(alt => {
            applyAlterationEffect(pokemon, alt)
            if(!alt.keepStacks) alt.stacks--;
            if(alt.stacks <= 0){
                removeAlteration(pokemon, alt)                
            } else if(alt.effectSprite){
                const [x,y] = pokemon.position
                alt.effectSprite.setPosition(x, y+(alt.effectDelta ?? 0))
            }
        })
    })
}

export function applyAlterationEffect(pokemon: PokemonOnBoard, alteration: Alteration){
    const game = gameState.activeScene as GameScene;
    const sprite = game.sprites.get(pokemon.uid)
    const perSecond = game.gameSpeed / 1000
    if(alteration.type === AlterationType.TOURBILLON){
        switch(pokemon.facingDirection){
            case Direction.UP: pokemon.facingDirection = Direction.RIGHT; break;
            case Direction.RIGHT: pokemon.facingDirection = Direction.DOWN; break;
            case Direction.DOWN: pokemon.facingDirection = Direction.LEFT; break;
            case Direction.LEFT: default: pokemon.facingDirection = Direction.UP; break;
        }

        sprite?.play(`${pokemon.ref}_${pokemon.facingDirection}`)
    } else if(alteration.type === AlterationType.POISON){
        let poisonDamage = Math.min(500, alteration.stacks) * perSecond * (1 / 10000) * pokemon.maxPV // 0.01% max HP per stack per second
        if(pokemon.entry.types.includes(POKEMON_TYPES.POISON)){
            poisonDamage *= 0.5
            // type poison = 50% résistance au poison //TODO: bonus alliance à prendre en compte
        }
        applyDamage(poisonDamage, pokemon, true, true)
    } else if(alteration.type === AlterationType.BRULURE){
        const burnDamage = 0.1 * perSecond * pokemon.level; // 0.1 HP per second per level
        applyDamage(burnDamage, pokemon, true, false)
        const gel = pokemon.alterations.find(alt => alt.type === AlterationType.GEL)
        if(gel) gel.stacks -= 3
    } else if(alteration.type === AlterationType.SOMMEIL){
        sprite?.anims.pause()
    } else if(alteration.type === AlterationType.LIGOTAGE){
        let damage = pokemon.maxPV * (2/100) * perSecond // 2% HP max per second        
        applyDamage(damage, pokemon, true, false)
    } else if(alteration.type === AlterationType.SOIN){
        healPokemon(pokemon, 0.1 * perSecond * pokemon.level)  // 0.1 HP par level par seconde                
    } else if(alteration.type === AlterationType.REPOS){
        healPokemon(pokemon, (5/100) * perSecond * pokemon.maxPV) // 5% max HP par seconde
    } else if(alteration.type === AlterationType.EXECUTION){
        if(pokemon.pv < 30/100 * pokemon.maxPV) killPokemon(pokemon)
    } else if(alteration.type === AlterationType.DAMAGE_OVER_TIME){
        applyDamage(10 * perSecond, pokemon)
    }
}

export function hasBlockingAlteration(pokemon: PokemonOnBoard){
    return pokemon.hasAlteration(AlterationType.TOURBILLON)
        || pokemon.hasAlteration(AlterationType.SOMMEIL)
}

export function canPokemonBeTargeted(pokemon: PokemonOnBoard){
    return !pokemon.hasAlteration(AlterationType.TOURBILLON)
}

export function addAlteration(pokemon: PokemonOnBoard, alteration: Alteration, game: GameScene){
    const alterationToStack = pokemon.alterations.find(alt => alt.type === alteration.type)
    if(alterationToStack){        
        alterationToStack.stacks += alteration.stacks
        //console.log(`More stacks of ${alteration.type} on ${pokemon.entry.name} (stacks: ${alterationToStack.stacks})`)
    } 
    else {
        console.log(`Apply ${alteration.type} on ${pokemon.entry.name} (stacks: ${alteration.stacks})`)
        const targetSprite = game.sprites.get(pokemon.uid)
        if(!targetSprite) return console.error(`Error, can't find pokemon sprite uid ${pokemon.uid}`)

        switch(alteration.type){
            case AlterationType.TOURBILLON:
                pokemon.resetAction()
                sendPokemonFlying(pokemon, alteration.stacks, game)
                break;
            
            case AlterationType.BRULURE:
                alteration.effectSprite = makeEffectSprite(EFFECTS.BURN, targetSprite.x, targetSprite.y, game)
                //game.tweens.add({ targets: alteration.effectSprite, alpha: 0.35, duration: 250, easing: "Linear" })
                break;

            case AlterationType.GEL:
                alteration.effectSprite = makeEffectSprite(EFFECTS.FROZEN, targetSprite.x, targetSprite.y, game)
                //game.tweens.add({ targets: alteration.effectSprite, alpha: EFFECTS.FROZEN.opacity, duration: 250, easing: "Linear" })
                break;

            case AlterationType.SOMMEIL:
                pokemon.resetAction()
                alteration.effectSprite = makeEffectSprite(EFFECTS.SOMMEIL, targetSprite.x, targetSprite.y, game)
                break;

            case AlterationType.PARALYSIE:
                alteration.effectSprite = makeEffectSprite(EFFECTS.PARALYSIE, targetSprite.x, targetSprite.y, game)
                break;

            case AlterationType.PEUR:
                pokemon.resetAction()
                alteration.effectSprite = makeEffectSprite(EFFECTS.PEUR, targetSprite.x, targetSprite.y, game)
                break;

            case AlterationType.POISON:
                alteration.effectSprite = makeEffectSprite(EFFECTS.POISON, targetSprite.x, targetSprite.y-8, game)
                alteration.effectDelta = -8;
                break;

            case AlterationType.SOIN:
            case AlterationType.REPOS:
                alteration.effectSprite = makeEffectSprite(EFFECTS.SOIN, targetSprite.x, targetSprite.y-8, game)
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