import { AlterationType, Alteration } from "../data/alterations"
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
                removeInArray(pokemon.alterations, alt)
            }
        })
    })
}

export function applyAlterationEffect(pokemon: PokemonOnBoard, alteration: Alteration){
    const game = gameState.activeScene as GameScene;
    if(alteration.type === AlterationType.MAELSTROM){
        switch(pokemon.facingDirection){
            case Direction.UP: pokemon.facingDirection = Direction.RIGHT; break;
            case Direction.RIGHT: pokemon.facingDirection = Direction.DOWN; break;
            case Direction.DOWN: pokemon.facingDirection = Direction.LEFT; break;
            case Direction.LEFT: default: pokemon.facingDirection = Direction.UP; break;
        }

        const sprite = game.sprites.get(pokemon.uid)
        sprite?.play(`${pokemon.ref}_${pokemon.facingDirection}`)
    } else if(alteration.type === AlterationType.POISON){
        applyDamage(alteration.stacks, pokemon)
    }
}

export function hasBlockingAlteration(pokemon: PokemonOnBoard){
    return pokemon.alterations.some(alt => alt.type === AlterationType.MAELSTROM)
}

export function canPokemonBeTargeted(pokemon: PokemonOnBoard){
    return !pokemon.alterations.some(alt => alt.type === AlterationType.MAELSTROM)
}

export function addAlteration(pokemon: PokemonOnBoard, alteration: Alteration, game: GameScene){    
    const alterationToStack = pokemon.alterations.find(alt => alt.type === alteration.type)
    if(alterationToStack){        
        alterationToStack.stacks += alteration.stacks
        console.log(`More stacks of ${alteration.type} on ${pokemon.name} (stacks: ${alterationToStack.stacks})`)
    } 
    else {
        console.log(`Apply ${alteration.type} on ${pokemon.name} (stacks: ${alteration.stacks})`)
        pokemon.alterations.push({ ...alteration })

        if(alteration.type === AlterationType.MAELSTROM){
            // send pokemon flying
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
    }
}