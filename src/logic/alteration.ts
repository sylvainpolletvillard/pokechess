import {Alteration, AlterationType} from "../data/alterations"
import {EFFECTS} from "../data/effects"
import { TYPE_COMBAT, TYPE_EAU, TYPE_FEU, TYPE_PSY, TYPE_SPECTRE } from "../data/types"
import {PokemonOnBoard} from "../objects/pokemon"
import GameScene from "../scenes/GameScene"
import {Direction} from "../utils/directions"
import {removeInArray} from "../utils/helpers"
import {applyDamage, calcBurnDamage, calcPoisonDamage, healPokemon, killPokemon} from "./fight"
import {gameState} from "./gamestate"
import {freezePokemonDuringMs, makeEffectSprite, sendPokemonFlying} from "./skill-anims"

export function updateAlterations(pokemon: PokemonOnBoard, game: GameScene){
    pokemon.alterations.forEach(alt => {
        applyAlterationEffect(pokemon, alt)
        if(!alt.keepStacks) alt.stacks--;
        if(alt.stacks <= 0){
            removeAlteration(pokemon, alt)                
        } else if(alt.effectSprite){
            const pokemonSprite = game.sprites.get(pokemon.uid)
            if(pokemonSprite){
                alt.effectSprite.setPosition(pokemonSprite.x, pokemonSprite.y+(alt.effectDelta ?? 0))
            } else {
                alt.effectSprite.destroy()
            }                
        }
    })
}

export function applyAlterationEffect(pokemon: PokemonOnBoard, alteration: Alteration){
    const game = gameState.activeScene as GameScene;
    const sprite = game.sprites.get(pokemon.uid)
    const perSecond = game.gameSpeed / 1000

    switch(alteration.type){
        case AlterationType.POISON: 
            const poisonDamage = calcPoisonDamage(pokemon, alteration, game)        
            applyDamage(poisonDamage, pokemon, true, true)
            break;

        case AlterationType.BRULURE:
            const burnDamage = calcBurnDamage(pokemon, game)
            applyDamage(burnDamage, pokemon, true, false)
            const gel = pokemon.alterations.find(alt => alt.type === AlterationType.GEL)
            if(gel) gel.stacks -= 3
            break;

        case AlterationType.SOMMEIL:
            sprite?.anims.pause()
            break;

        case AlterationType.LIGOTAGE:
            let damage = pokemon.maxPV * (2/100) * perSecond // 2% HP max per second        
            applyDamage(damage, pokemon, true, false)
            break;

        case AlterationType.SOIN:
            healPokemon(pokemon, 0.1 * perSecond * pokemon.level)  // 0.1 HP par level par seconde
            break;

        case AlterationType.REPOS:
            healPokemon(pokemon, (5/100) * perSecond * pokemon.maxPV) // 5% max HP par seconde
            break;

        case AlterationType.EXECUTION:
            if(pokemon.pv < 30/100 * pokemon.maxPV) killPokemon(pokemon)
            break;

        case AlterationType.DAMAGE_OVER_TIME:
            applyDamage(10 * perSecond, pokemon)
            break;
        
        case AlterationType.TOURBILLON:
            switch(pokemon.facingDirection){
                case Direction.UP: pokemon.facingDirection = Direction.RIGHT; break;
                case Direction.RIGHT: pokemon.facingDirection = Direction.DOWN; break;
                case Direction.DOWN: pokemon.facingDirection = Direction.LEFT; break;
                case Direction.LEFT: default: pokemon.facingDirection = Direction.UP; break;
            }
    
            sprite?.play(`${pokemon.entry.ref}_${pokemon.facingDirection}`)
            break;
    }
}

export function hasBlockingAlteration(pokemon: PokemonOnBoard){
    return pokemon.hasAlteration(AlterationType.TOURBILLON)
        || pokemon.hasAlteration(AlterationType.SOMMEIL)
}

export function addAlteration(pokemon: PokemonOnBoard, alteration: Alteration, game: GameScene){
    if(!pokemon.alive) return;
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
                let duration = alteration.stacks * game.gameSpeed
                pokemon.makeUntargettable(duration)
                freezePokemonDuringMs(pokemon, duration, game)
                sendPokemonFlying(pokemon, alteration.stacks, game)
                break;
            
            case AlterationType.BRULURE:
                if(pokemon.hasType(TYPE_EAU)) break; // Pokémon Eau insensible aux brûlures
                alteration.effectSprite = makeEffectSprite(EFFECTS.BURN, targetSprite.x, targetSprite.y, game)
                //game.tweens.add({ targets: alteration.effectSprite, alpha: 0.35, duration: 250, easing: "Linear" })
                break;

            case AlterationType.GEL:
                if(pokemon.hasType(TYPE_FEU)) break; // Pokémon Feu insensible au Gel
                alteration.effectSprite = makeEffectSprite(EFFECTS.FROZEN, targetSprite.x, targetSprite.y, game)
                pokemon.makeUntargettable(alteration.stacks * game.gameSpeed)
                //game.tweens.add({ targets: alteration.effectSprite, alpha: EFFECTS.FROZEN.opacity, duration: 250, easing: "Linear" })
                break;

            case AlterationType.SOMMEIL:
                if(pokemon.hasType(TYPE_SPECTRE)) break; // Pokémon Spectre insensible au sommeil
                pokemon.resetAction()
                alteration.effectSprite = makeEffectSprite(EFFECTS.SOMMEIL, targetSprite.x, targetSprite.y, game)
                break;

            case AlterationType.CONFUSION:
                if(pokemon.hasType(TYPE_PSY)) break; // Pokémon Psy insensible à la confusion
                pokemon.resetAction()
                alteration.effectSprite = makeEffectSprite(EFFECTS.CONFUSION, targetSprite.x, targetSprite.y, game)
                break;

            case AlterationType.PARALYSIE:
                alteration.effectSprite = makeEffectSprite(EFFECTS.PARALYSIE, targetSprite.x, targetSprite.y, game)
                break;

            case AlterationType.PEUR:
                if(pokemon.hasType(TYPE_COMBAT)) break; // Pokémon Combat insensible à la peur
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

    if(alt.type === AlterationType.CONFUSION){
        pokemon.resetAction()
    }
}

export function removeAllAlterations(){
    gameState.allPokemonsOnBoard.forEach(pokemon => {
        pokemon.alterations.forEach(alt => {
            removeAlteration(pokemon, alt)
        })
    })
}