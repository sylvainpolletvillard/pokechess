import {Alteration, AlterationType} from "../data/alterations"
import { COLLINE_ROYALE } from "../data/destinations/colline_royale"
import {EFFECTS} from "../data/effects"
import { BAIE_CERIZ, POKEFLUTE } from "../data/items"
import { TYPE_COMBAT, TYPE_EAU, TYPE_FEU, TYPE_PSY, TYPE_SPECTRE } from "../data/types"
import {PokemonOnBoard} from "../objects/pokemon"
import GameScene from "../scenes/GameScene"
import {Direction} from "../utils/directions"
import {clamp, removeInArray} from "../utils/helpers"
import { playSound } from "./audio"
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
            console.log(`Poison damage to ${pokemon.entry.name}: ${poisonDamage}`)
            applyDamage(poisonDamage, pokemon, alteration.attacker, true, true)
            break;

        case AlterationType.BRULURE:
            const burnDamage = calcBurnDamage(pokemon, game)
            applyDamage(burnDamage, pokemon, alteration.attacker, true, false)
            console.log(`Burn damage to ${pokemon.entry.name}: ${burnDamage}`)
            const gel = pokemon.alterations.find(alt => alt.type === AlterationType.GEL)
            if(gel) gel.stacks -= 3
            break;

        case AlterationType.SOMMEIL:
            sprite?.anims.pause()
            break;

        case AlterationType.LIGOTAGE:
            let damage = pokemon.maxPV * (2/100) * perSecond // 2% HP max per second        
            applyDamage(damage, pokemon, alteration.attacker, true, false)
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
            applyDamage(5 * perSecond, pokemon, alteration.attacker)
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
    if(pokemon.unalterable && [
        AlterationType.BRULURE,
        AlterationType.CONFUSION,
        AlterationType.GEL,
        AlterationType.PARALYSIE,
        AlterationType.PEUR,
        AlterationType.POISON,
        AlterationType.SOMMEIL
    ].includes(alteration.type)) return;

    if(pokemon.item === BAIE_CERIZ){
        pokemon.unalterable = true;
        setTimeout(() => { pokemon.unalterable = false; }, 10 * 1000)
        pokemon.item = null;
        playSound("heal_ailment")
    }

    const alterationToStack = pokemon.alterations.find(alt => alt.type === alteration.type)
    if(alterationToStack){        
        // altérations ne pouvant pas se stack:
        if([ AlterationType.SOMMEIL, AlterationType.PEUR, AlterationType.CONFUSION ].includes(alteration.type)) return;
            
        alterationToStack.stacks += alteration.stacks
        console.log(`More stacks of ${alteration.type} on ${pokemon.entry.name} (stacks: ${alterationToStack.stacks})`)

        if(alteration.type === AlterationType.RAGE){
            const targetSprite = game.sprites.get(pokemon.uid)
            if(!targetSprite) return console.error(`Error, can't find pokemon sprite uid ${pokemon.uid}`)
            targetSprite.setTint(Phaser.Display.Color.GetColor(255, clamp(200- alteration.stacks * 40, 0,255), clamp(128 - alteration.stacks * 30,0, 255)))
        } 
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
                if(pokemon.hasType(TYPE_EAU)) return; // Pokémon Eau insensible aux brûlures
                alteration.effectSprite = makeEffectSprite(EFFECTS.BURN, targetSprite.x, targetSprite.y, game)
                //game.tweens.add({ targets: alteration.effectSprite, alpha: 0.35, duration: 250, easing: "Linear" })
                break;

            case AlterationType.GEL:
                if(pokemon.hasType(TYPE_FEU)) return; // Pokémon Feu insensible au Gel
                alteration.effectSprite = makeEffectSprite(EFFECTS.FROZEN, targetSprite.x, targetSprite.y, game)
                pokemon.makeUntargettable(alteration.stacks * game.gameSpeed)
                //game.tweens.add({ targets: alteration.effectSprite, alpha: EFFECTS.FROZEN.opacity, duration: 250, easing: "Linear" })
                break;

            case AlterationType.SOMMEIL:
                if(pokemon.item === POKEFLUTE) return;
                if(pokemon.hasType(TYPE_SPECTRE)) return; // Pokémon Spectre insensible au sommeil
                pokemon.resetAction()
                alteration.effectSprite = makeEffectSprite(EFFECTS.SOMMEIL, targetSprite.x, targetSprite.y, game)
                break;

            case AlterationType.CONFUSION:
                if(pokemon.hasType(TYPE_PSY)) return; // Pokémon Psy insensible à la confusion
                pokemon.resetAction()
                alteration.effectSprite = makeEffectSprite(EFFECTS.CONFUSION, targetSprite.x, targetSprite.y, game)
                break;

            case AlterationType.PARALYSIE:
                alteration.effectSprite = makeEffectSprite(EFFECTS.PARALYSIE, targetSprite.x, targetSprite.y, game)
                break;

            case AlterationType.PEUR:
                if(pokemon.hasType(TYPE_COMBAT)) return; // Pokémon Combat insensible à la peur
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

            case AlterationType.RAGE:                
                targetSprite.setTint(Phaser.Display.Color.GetColor(255, 200, 200))
                break;
        }

        pokemon.alterations.push({ ...alteration })
    }

    if(alteration.type === AlterationType.REPOS){
        addAlteration(pokemon, { type: AlterationType.SOMMEIL, stacks: alteration.stacks, attacker: pokemon }, game)
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

    if(alt.type === AlterationType.CONFUSION || alt.type === AlterationType.GEL){
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